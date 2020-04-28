const { bold } = require('chalk');

module.exports = async (l, e, line) => {
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

    const imgMd = `![${alt}${size !== 'medium' ? ' | ' + size : ''}](${src}${
      title ? " '" : ''
    }${title}${title ? "'" : ''})`;

    const md = line.replace(/\[caption.*\[\/caption\]/gms, '').trim();
    return md ? [imgMd, md].join('\n\n') : imgMd;
  } else if (imgMatch) {
    const altMatch = /alt="([^"]*)"/.exec(imgMatch[1]);
    const alt = altMatch && altMatch[1];
    const srcMatch = /src="([^"]*)"/.exec(imgMatch[1]);
    const src = srcMatch && srcMatch[1];
    const sizeMatch = /class="[^"]*size-([^ "]*)[^"]*"/.exec(imgMatch[1]);
    const size = (sizeMatch && sizeMatch[1]) || 'medium';

    const imgMd = `![${alt}${size !== 'medium' ? ' | ' + size : ''}](${src})`;

    const md = line.replace(/\<img.*>/gms, '').trim();
    return md ? [imgMd, md].join('\n\n') : imgMd;
  } else {
    return line;
  }
};
