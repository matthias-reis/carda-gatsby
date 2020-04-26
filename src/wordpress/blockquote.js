const { bold } = require('chalk');

module.exports = async (l, e, data) => {
  data.content = data.content
    // first all properly closing quotes
    .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gms, (_, quote) => {
      return `\n> ${quote.replace(/\n/g, ' ')}\n`;
    });
  // then all orphaned ending tags
  // .replace(/<\/blockquote>/g, '');
  // then all remaining opening tags till the end of the paragraph
  // .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gms, (_, quote) => {
  //   return `\n> ${quote.replace(/\n/g, ' ')}\n`;
  // });
  return data;
};
