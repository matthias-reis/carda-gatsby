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
const media = require('../../content/wordpress/media/images.json');

const BASE_FOLDER = resolve(__dirname, '../..', 'content/wordpress');
const INPUT_FOLDER = resolve(BASE_FOLDER, 'source-articles');
const OUTPUT_FILE = resolve(BASE_FOLDER, 'media', 'images.json');

activity('wordpress-media', async (l) => {
  const files = await activity('findMediaXml', findXml)(
    INPUT_FOLDER,
    'media*.xml'
  );
  const filePromises = files.map(async (file) => {
    const content = await activity('read', read)(file);
    const json = await activity('toJson', toJson)(content);
    const pickedMedia = await activity('pickMedia', pickMedia)(json);
    return pickedMedia;
  });
  const rawImages = (await Promise.all(filePromises)).flat();

  const filledMedia = await activity('extractMediaData', extractMediaData)(
    rawImages,
    media
  );

  let relevantImages = Object.values(filledMedia.images).filter(
    (i) => !i.processed
  );

  l(
    `found <${Object.keys(filledMedia.images).length} images> / <${
      Object.keys(relevantImages).length
    } unprocessed>`
  );

  // relevantImages = relevantImages.slice(-10);
  // relevantImages = relevantImages.slice(0, 10); // for testing

  const chunks = splitEvery(10, relevantImages);

  let counter = chunks.length;
  l(`processing <${relevantImages.length} images> in <${counter} chunks>`);

  for (const chunk of chunks) {
    await activity(
      'imageChunk',
      async (l, e) => {
        const id = counter;
        l(`start chunk: <${id}> chunks left`);
        const chunkPromises = chunk.map(async (image) => {
          // download images from origin
          await activity('downloadImage', downloadImage)(image, media);
          // refine / recalculate into 3 sizes
          await activity('processImage', processImage)(image, media);
          // upload to google cloud
          await activity('uploadImage', uploadImage)(image, media);
        });
        await Promise.all(chunkPromises);
        await wait(500); // delay to let the servers rest
        // save images after every chunk
        await activity('writeImageData', writeImageData)(media, OUTPUT_FILE);
        counter--;
        l(
          `end chunk: <${id}>, cumulated errors: <${
            Object.keys(media.errors).length
          }>`
        );
      },
      true
    )();
  }
})();
