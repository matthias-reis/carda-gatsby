const { resolve } = require('path');
const { yellow } = require('chalk');
const { writeFileSync } = require('fs');
const { join } = require('path');

const activity = require('./activity');
const findXml = require('./findXml');
const read = require('./read');
const toJson = require('./toJson');
const pickArticles = require('./pickArticles');
const extractMeta = require('./extractMeta');
const prettier = require('./prettier');
const concat = require('./concat');
const subTitle = require('./subTitle');
const inline = require('./inline');
const headlines = require('./headlines');
const images = require('./images');
const links = require('./links');
const blockquote = require('./blockquote');
const lists = require('./lists');
const cleanup = require('./cleanup');
const verify = require('./verify');
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
    /** ARTICLE PIPELINE **/
    let m = await activity('extractMeta', extractMeta, false)(article);

    m = await activity('subTitle', subTitle, false)(m);
    for (const i in m.lines) {
      /** LINE PIPELINE **/
      m.lines[i] = await activity('headlines', headlines)(m.lines[i]);
      m.lines[i] = await activity('inline', inline)(m.lines[i]);
      m.lines[i] = await activity('blockquote', blockquote)(m.lines[i]);
      m.lines[i] = await activity('links', links)(m.lines[i]);
      m.lines[i] = await activity('images', images)(m.lines[i]);
      m.lines[i] = await activity('lists', lists)(m.lines[i]);
      // metadata = await activity('cleanup', cleanup, false)(metadata);
    }
    m = await activity('concat', concat, false)(m);
    m = await activity('prettier', prettier)(m);
    m = await activity('verify', verify, false)(m);
    await activity('write', write, false)(m, OUTPUT_FOLDER);
    return m;
  });

  const parsedArticles = await Promise.all(articlePromises);
  l(`parsed ${yellow(articles.length)} articles`);

  const paths = parsedArticles.map((a) => a.meta.link);
  const errors = parsedArticles.reduce((ret, a) => {
    for (const eType in a.meta.errors) {
      if (!ret[eType]) {
        ret[eType] = [];
      }
      ret[eType].push(a.meta.link);
    }
    return ret;
  }, {});

  writeFileSync(
    join(__dirname, '../../content/wordpress/metadata/meta.json'),
    JSON.stringify({ paths, errors }, null, 2),
    {
      encoding: 'utf8',
    }
  );

  l(`✅ all done`);
})();
