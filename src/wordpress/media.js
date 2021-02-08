const { resolve } = require('path');
const { splitEvery } = require('ramda');

const activity = require('./activity');
const findXml = require('./findXml');
const read = require('./read');
const toJson = require('./toJson');
const pickMedia = require('./pickArticles');
const extractMediaData = require('./extractMediaData');
const writeImageData = require('./writeImageData');
const wait = require('./wait');
const downloadImage = require('./downloadImage');
const processImage = require('./processImage');
const uploadImage = require('./uploadImage');

const BASE_FOLDER = resolve(__dirname, '../..', 'content/wordpress');
const INPUT_FOLDER = resolve(BASE_FOLDER, 'source');
const OUTPUT_FILE = resolve(BASE_FOLDER, 'media', 'images.json');

activity('wordpress-media', async (l) => {
  const files = await activity('findMediaXml', findXml)(
    INPUT_FOLDER,
    'media*.xml'
  );
  const filePromises = files.map(async (file) => {
    const content = await activity('read', read)(file);
    const json = await activity('toJson', toJson)(content);
    const media = await activity('pickMedia', pickMedia)(json);
    return media;
  });
  const rawImages = (await Promise.all(filePromises)).flat();

  const images = await activity(
    'extractMediaData',
    extractMediaData
  )(rawImages);

  const relevantImages = images.slice(0, 40);
  const chunks = splitEvery(10, relevantImages);

  let counter = chunks.length;
  l(`working on <${relevantImages.length} images> in <${counter} chunks>`);

  const processedImages = [];

  for (const chunk of chunks) {
    await activity(
      'imageChunk',
      async (l, e) => {
        const id = counter;
        l(`start chunk: <${id}> chunks left`);
        const chunkPromises = chunk.map(async (image) => {
          // download images from origin
          const imageWithBuffer = await activity(
            'downloadImage',
            downloadImage
          )(image);

          // refine / recalculate into 3 sizes
          const imageWithPipeline = await activity(
            'processImage',
            processImage
          )(imageWithBuffer);

          // upload to google cloud
          const imageWithUrls = await activity(
            'uploadImage',
            uploadImage
          )(imageWithPipeline);
        });
        await wait(100); // delay 50ms
        counter--;
        const chunkResults = await Promise.all(chunkPromises);
        processedImages.push(chunkResults);
        l(`end chunk: <${id}>`);
      },
      true
    )();
  }

  // wait 100 ms

  // save images
  await activity('writeImageData', writeImageData)(images, OUTPUT_FILE);
})();
