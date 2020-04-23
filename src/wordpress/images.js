const { bold } = require('chalk');

module.exports = async (l, e, data) => {
  // split the content into paragraphs first
  const paragraphs = data.content
    .split('\n\n')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((p, i) => {
      // first caption based images
      const captionRegex = /\[caption(.*)\](.*)<img(.*)\/>(.*)\[\/caption\]/gm;
      const captionMatch = captionRegex.exec(p);
      const imgRegex = /<img(.*)\/>/gm;
      const imgMatch = imgRegex.exec(p);
      if (captionMatch) {
        const title = (captionMatch[2] + ' ' + captionMatch[4]).trim();
        const altMatch = /alt="([^"]*)"/g.exec(captionMatch[3]);
        const alt = altMatch && altMatch[1];
        const srcMatch = /src="([^"]*)"/g.exec(captionMatch[3]);
        const src = srcMatch && srcMatch[1];
        const sizeMatch = /class="[^"]*size-([^ "]*)[^"]*"/g.exec(
          captionMatch[3]
        );
        const size = (sizeMatch && sizeMatch[1]) || 'medium';

        const imgMd = `![${alt}${
          size !== 'medium' ? ' | ' + size : ''
        }](${src}${title ? " '" : ''}${title}${title ? "'" : ''})`;

        const md = p.replace(/\[caption.*\[\/caption\]/g, '').trim();
        console.log('IN:', p);
        console.log('OUT:', md);
        return md ? [imgMd, md] : imgMd;
      } else if (imgMatch) {
        const altMatch = /alt="([^"]*)"/g.exec(imgMatch[1]);
        const alt = altMatch && altMatch[1];
        const srcMatch = /src="([^"]*)"/g.exec(imgMatch[1]);
        const src = srcMatch && srcMatch[1];
        const sizeMatch = /class="[^"]*size-([^ "]*)[^"]*"/g.exec(imgMatch[1]);
        const size = (sizeMatch && sizeMatch[1]) || 'medium';

        const imgMd = `![${alt}${
          size !== 'medium' ? ' | ' + size : ''
        }](${src})`;

        const md = p.replace(/\<img.*>/g, '').trim();
        console.log('IN:', p);
        console.log('OUT:', md);
        return md ? [imgMd, md] : imgMd;
      } else {
        return p;
      }
    })
    .flat();
  data.content = paragraphs.join('\n\n');

  return data;
};
