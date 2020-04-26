const { resolve } = require('path');
const { yellow } = require('chalk');

const activity = require('./activity');
const findXml = require('./findXml');
const read = require('./read');
const toJson = require('./toJson');
const pickArticles = require('./pickArticles');
const extractMeta = require('./extractMeta');
const subTitle = require('./subTitle');
const inline = require('./inline');
const headlines = require('./headlines');
const images = require('./images');
const links = require('./links');
const blockquote = require('./blockquote');
const lists = require('./lists');
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
  const articlePromises = articles.slice(-10).map(async (article) => {
    let metadata = await activity('extractMeta', extractMeta, false)(article);
    metadata = await activity('subTitle', subTitle, false)(metadata);
    await activity('write', write, false)(metadata, OUTPUT_FOLDER, '.plain.md');
    metadata = await activity('inline', inline, false)(metadata);
    metadata = await activity('headlines', headlines, false)(metadata);
    metadata = await activity('blockquote', blockquote, false)(metadata);
    metadata = await activity('images', images, false)(metadata);
    metadata = await activity('links', links, false)(metadata);
    metadata = await activity('lists', lists, false)(metadata);
    await activity('write', write, false)(metadata, OUTPUT_FOLDER);
  });

  await Promise.all(articlePromises);

  l(`✅ all done`);
})();
