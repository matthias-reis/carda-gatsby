const { bold } = require('chalk');

module.exports = async (l, e, line) => {
  return (
    line
      // no one needs spans
      .replace(/<span[^>]*>(.*?)<\/span>/gms, (_, inner) => inner)
      // now em and i
      .replace(/<em[^>]*>(.*?)<\/em>/gms, (_, inner) => ` _${inner.trim()}_ `)
      .replace(/<i[^>]*>(.*?)<\/i>/gms, (_, inner) => ` _${inner.trim()}_ `)
      // now strong and
      .replace(
        /<strong[^>]*>(.*?)<\/strong>/gms,
        (_, inner) => ` __${inner.trim()}__ `
      )
      .replace(/<b[^>]*>(.*?)<\/b>/gms, (_, inner) => ` __${inner.trim()}__ `)
  );
};
