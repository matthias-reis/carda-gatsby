const { resolve } = require('path');
const { bold, yellow } = require('chalk');
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
const gallery = require('./gallery');
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
      m.lines[i] = await activity('gallery', gallery)(m.lines[i], m);
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

  const paths = parsedArticles.map((a) => a.meta.path);
  const errors = parsedArticles.reduce((ret, a) => {
    for (const eType in a.meta.errors) {
      if (!ret[eType]) {
        ret[eType] = [];
      }
      ret[eType].push({
        path: `https://cardamonchai.com${a.meta.path}`,
        message: a.meta.errors[eType],
      });
    }
    return ret;
  }, {});

  let errorOutput = '';
  for (const type in errors) {
    errorOutput += `
    <h2>${type}</h2>
    `;
    for (const error of errors[type]) {
      errorOutput += `
<p>
  <a href="${error.path}">
    <strong>${error.path}</strong><br />
    ${error.message}
  </a>
</p>`;
    }
  }

  writeFileSync(
    join(__dirname, '../../content/wordpress/metadata/meta.json'),
    JSON.stringify({ paths, errors }, null, 2),
    {
      encoding: 'utf8',
    }
  );
  writeFileSync(
    join(__dirname, '../../content/wordpress/metadata/errors.html'),
    errorOutput,
    {
      encoding: 'utf8',
    }
  );

  for (const type in errors) {
    l(`found ${yellow(errors[type].length)} errors of type ${bold(type)}`);
  }

  l(`✅ all done`);
})();
