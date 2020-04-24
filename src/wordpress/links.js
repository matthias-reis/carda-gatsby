const { bold } = require('chalk');

module.exports = async (l, e, data) => {
  data.content = data.content.replace(
    /([\"]?)<a (.*)>(.*)<\/a>([\",;\.]?)/gm,
    (_, before, props, text, after) => {
      const hrefMatch = /href="([^"]*)"/g.exec(props);
      let href = hrefMatch && hrefMatch[1];
      href = href
        .replace('http://cardamonchai.com', '')
        .replace('https://cardamonchai.com', '');
      return ` ${before || ''}[${text.trim()}](${href})${after || ''} `;
    }
  );
  return data;
};
