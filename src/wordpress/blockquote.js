const { bold } = require('chalk');

module.exports = async (l, e, line) => {
  return (
    line
      // first all properly closing quotes
      .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gms, (_, quote) => {
        return `> ${quote.replace(/\n/g, ' ')}`;
      })
  );
};
