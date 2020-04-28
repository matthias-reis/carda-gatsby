const { pick } = require('ramda');
const { bold, redBright, greenBright } = require('chalk');

const { slugify } = require('../gatsby/slugify');

const getLabels = (e, cat, link) => {
  if (cat.domain[0] === 'post_tag' || cat.domain[0] === 'category') {
    return cat.node.replace('&amp;', '&');
  } else if (cat.domain[0] !== 'type') {
    e(
      meta.fileName,
      `${bold('special tag found')}
Label: ${redBright(cat.node)}
Domain: ${redBright(cat.domain[0])}

`
    );
  }
};

const getType = (categories) => {
  const found = categories.find((cat) => cat.domain[0] === 'type');
  return (found && found.node) || 'Artikel';
};

module.exports = async (l, e, article) => {
  const title = article.title[0];
  const slugFromTitle = slugify(title);
  let link = article.link[0]
    .replace('http://cardamonchai.com', '')
    .replace('https://cardamonchai.com', '');
  const linkPaths = link.replace(/\//g, ' ').trim().split(' ');
  const slug = linkPaths.length === 3 ? linkPaths[2] : slugFromTitle;

  const date = new Date(article['wp:post_date']);
  const month = `00${date.getMonth() + 1}`.slice(-2);
  const fileName = `${date.getFullYear()}-${month}---${slugFromTitle}.md`;

  if (link.startsWith('/?p=')) {
    link = `/${date.getFullYear()}/${month}/${slugFromTitle}`;
  }

  const wpPostMeta = article['wp:postmeta'].reduce((res, i) => {
    res[i['wp:meta_key'][0]] = i['wp:meta_value'][0];
    return res;
  }, {});
  const pickedWpPostMeta = pick(
    [
      'articletype',
      '_yoast_wpseo_focuskw',
      '_yoast_wpseo_title',
      '_yoast_wpseo_metadesc',
      '_thumbnail_id',
    ],
    wpPostMeta
  );

  const meta = {
    title,
    seoTitle: pickedWpPostMeta['_yoast_wpseo_title'] || title,
    slug,
    link,
    fileName,
    description: pickedWpPostMeta['_yoast_wpseo_metadesc'] || '',
    excerpt:
      article['excerpt:encoded'][0] ||
      pickedWpPostMeta['_yoast_wpseo_metadesc'] ||
      '',
    focusKeyword: pickedWpPostMeta['_yoast_wpseo_focuskw'] || '',
    labels: article.category
      .map((cat) => getLabels(e, cat, fileName))
      .filter(Boolean),
    type: getType(article.category),
    typeName:
      (pickedWpPostMeta.articletype || '').replace(/\n/g, '').trim() ||
      getType(article.category),
    date,
    status: article['wp:status'][0],
    isWerbung: false,
    isAffiliate: false,
    // todo - create valid link url from thumbnail id
    thumbnailId: pickedWpPostMeta['_thumbnail_id'],
    image: '/img/demo.jpg',
    errors: [],
  };

  // description is usually empty. seoDescription is important
  if (article.description[0] !== '') {
    e(
      meta.fileName,
      `${bold('has description')}
${redBright(article.description[0])}
${greenBright(pickedWpPostMeta['_yoast_wpseo_metadesc'])}

`
    );
  }

  if (isNaN(date.getFullYear())) {
    e(
      meta.fileName,
      `${bold('has no pub date')}
${redBright(article['wp:post_date'])}
${greenBright(article.pubDate)}
${greenBright(article['wp:post_date_gmt'])}

`
    );
  }

  // we parse with the mdx option first to get well formed stuff
  // const content = article['content:encoded'].join('\n\n');

  const lines = article['content:encoded'][0].split('\n\n').filter(Boolean);

  return {
    meta,
    lines,
    content: article['content:encoded'],
  };
};
