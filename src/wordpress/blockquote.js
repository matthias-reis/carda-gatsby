const { bold } = require('chalk');

module.exports = async (l, e, line) => {
  return (
    line
      // first all properly closing quotes
      .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gms, (_, quote) => {
        return `> ${quote.replace(/\n/g, ' ')}`;
      })
      // opening quotes spanning several paragraphs
      .replace(/<blockquote[^>]*>/gms, (_, quote) => {
        return `

<blockquote>

`;
      })
      // closing quotes spanning several paragraphs
      .replace(/<\/blockquote>/gms, (_, quote) => {
        return `

</blockquote>

`;
      })
  );
};
