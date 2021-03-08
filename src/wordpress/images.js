const R = require('ramda');
const images = require('../../content/wordpress/media/images.json');
const { bold } = require('chalk');
const urlToId = (s) =>
  s
    .replace('http://', '')
    .replace('https://', '')
    .replace(/-\d{1,4}x\d{1,4}/, '');

const imagesBySource = R.indexBy(
  (item) => urlToId(item.sourceUrl),
  Object.values(images.images)
);

const createImageTag = (e, article, src, alt, size, title = '') => {
  const remoteImage = imagesBySource[urlToId(src)];
  if (!remoteImage) {
    e('[img]', bold(article.meta.fileName), 'img from another domain');
    article.meta.errors.outsideImage =
      'article has at least one image from another domain';
  }
  return `
<RemoteImage
  alt={\`${alt && alt.replace(/&amp;/g, '&')}\`}
  size="${size}"
  title={\`${title && title.replace(/&amp;/g, '&')}\`}
  mediumUrl="${(remoteImage && remoteImage.mediumUrl) || src}"
  largeUrl="${(remoteImage && remoteImage.largeUrl) || src}"
  loadingUrl="${remoteImage && remoteImage.base64String}" />`;
};

module.exports = async (l, e, line, article) => {
  // split the content into paragraphs first
  const captionRegex = /\[caption(.*)\](.*)<img(.*)\/>(.*)\[\/caption\]/gms;
  const captionMatch = captionRegex.exec(line);

  const imgRegex = /<img(.*)\/>/gms;
  const imgMatch = imgRegex.exec(line);

  if (captionMatch) {
    const title = (captionMatch[2] + ' ' + captionMatch[4]).trim();
    const altMatch = /alt="([^"]*)"/.exec(captionMatch[3]);
    const alt = altMatch && altMatch[1];
    const srcMatch = /src="([^"]*)"/.exec(captionMatch[3]);
    const src = srcMatch && srcMatch[1];
    const sizeMatch = /class="[^"]*size-([^ "]*)[^"]*"/.exec(captionMatch[3]);
    const size = (sizeMatch && sizeMatch[1]) || 'medium';

    const imgMd = createImageTag(e, article, src, alt, size, title);
    const md = line.replace(/\[caption.*\[\/caption\]/gms, '').trim();
    return md ? [imgMd, md].join('\n\n') : imgMd;
  } else if (imgMatch) {
    const altMatch = /alt="([^"]*)"/.exec(imgMatch[1]);
    const alt = altMatch && altMatch[1];
    const srcMatch = /src="([^"]*)"/.exec(imgMatch[1]);
    const src = srcMatch && srcMatch[1];
    const sizeMatch = /class="[^"]*size-([^ "]*)[^"]*"/.exec(imgMatch[1]);
    const size = (sizeMatch && sizeMatch[1]) || 'medium';

    const imgMd = createImageTag(e, article, src, alt, size);
    const md = line.replace(/\<img.*>/gms, '').trim();
    return md ? [imgMd, md].join('\n\n') : imgMd;
  } else {
    return line;
  }
};
