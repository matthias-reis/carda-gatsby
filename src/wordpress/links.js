const { bold } = require('chalk');

module.exports = async (l, e, line) => {
  return line.replace(
    /([\"\n]?)<a ([^>]*)>(.*?)<\/a>([\",;\.]?)/gms,
    (_, before, props, text, after) => {
      const hrefMatch = /href="([^"]*)"/gms.exec(props);
      let href = hrefMatch && hrefMatch[1];
      href = href
        .replace('http://cardamonchai.com', '')
        .replace('https://cardamonchai.com', '');
      return ` ${before || ''}[${text.trim()}](${href})${after || ''} `;
    }
  );
};
