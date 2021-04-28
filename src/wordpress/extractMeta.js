const { pick, indexBy, prop } = require('ramda');
const { bold, redBright, greenBright } = require('chalk');

const { slugify } = require('../gatsby/slugify');

const { images } = require('../../content/wordpress/media/images.json');

const sanitize = (s) => s.replace('&amp;', '&');

const getLabels = (e, cat, link) => {
  if (cat.domain[0] === 'post_tag') {
    return sanitize(cat.node);
  } else if (cat.domain[0] === 'category') {
    // currently doing the same. Maybe must be changed
    return sanitize(cat.node);
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

const getType = (categories = []) => {
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
      '_yoast_wpseo_opengraph-image-id',
      '_yoast_wpseo_opengraph-title',
      '_yoast_wpseo_opengraph-description',
      '_thumbnail_id',
    ],
    wpPostMeta
  );

  const meta = {
    date,
    slug,
    path: link,
    type: article.category && getType(article.category),
    typeName:
      (pickedWpPostMeta.articletype || '').replace(/\n/g, '').trim() ||
      getType(article.category),
    title,
    seoTitle: pickedWpPostMeta['_yoast_wpseo_title'] || title,
    ogTitle:
      pickedWpPostMeta['_yoast_wpseo_opengraph-title'] ||
      pickedWpPostMeta['_yoast_wpseo_title'] ||
      title,
    description: pickedWpPostMeta['_yoast_wpseo_metadesc'] || '',
    excerpt:
      article['excerpt:encoded'][0] ||
      pickedWpPostMeta['_yoast_wpseo_metadesc'] ||
      '',
    fileName,
    remoteThumbnailImage: (images[pickedWpPostMeta['_thumbnail_id']] || {})
      .mediumUrl,
    remoteImage: (images[pickedWpPostMeta['_thumbnail_id']] || {}).largeUrl,
    remoteLoadingImage: (images[pickedWpPostMeta['_thumbnail_id']] || {})
      .base64String,
    ogImage: (images[pickedWpPostMeta['_yoast_wpseo_opengraph-image-id']] || {})
      .largeUrl,
    labels:
      article.category &&
      article.category
        .map((cat) => getLabels(e, cat, fileName))
        .filter(Boolean),
    focusKeyword: pickedWpPostMeta['_yoast_wpseo_focuskw'] || '',
    status: article['wp:status'][0],
    isWerbung: false,
    isAffiliate: false,
    language: 'de',
    errors: {},
  };

  // description is usually empty. seoDescription is important
  if (article.description[0] !== '') {
    meta.errors.hasDescription = article.description[0];
  }

  if (isNaN(date.getFullYear())) {
    meta.errors.noPubDate = {
      wpPostDate: article['wp:post_date'],
      pubDate: article.pubDate,
      wpPostDateGmt: article['wp:post_date_gmt'],
    };
  }

  const lines = article['content:encoded'][0].split('\n\n').filter(Boolean);

  return {
    meta,
    lines,
    content: article['content:encoded'],
  };
};
