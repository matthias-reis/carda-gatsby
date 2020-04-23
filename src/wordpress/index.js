const { resolve } = require('path');
const { yellow } = require('chalk');

const activity = require('./activity');
const findXml = require('./findXml');
const read = require('./read');
const toJson = require('./toJson');
const pickArticles = require('./pickArticles');
const extractMeta = require('./extractMeta');
const subTitle = require('./subTitle');
const headlines = require('./headlines');
const write = require('./write');

const BASE_FOLDER = resolve(__dirname, '../..', 'content/wordpress');
const INPUT_FOLDER = resolve(BASE_FOLDER, 'source');
const OUTPUT_FOLDER = resolve(BASE_FOLDER, 'articles');

activity('wordpress', async (l) => {
  const files = await activity('findXml', findXml)(INPUT_FOLDER);
  const filePromises = files.map(async (file) => {
    const content = await activity('read', read)(file);
    const json = await activity('toJson', toJson)(content);
    const picked = await activity('pickArticles', pickArticles)(json);
    return picked;
  });
  const articles = (await Promise.all(filePromises)).flat();
  l(`found ${yellow(articles.length)} articles`);
  const articlePromises = articles.map(async (article) => {
    let metadata = await activity('extractMeta', extractMeta, false)(article);
    metadata = await activity('subTitle', subTitle, false)(metadata);
    metadata = await activity('headlines', headlines, false)(metadata);
    await activity('write', write)(metadata, OUTPUT_FOLDER);
  });

  await Promise.all(articlePromises);

  l(`✅ all done`);
})();
