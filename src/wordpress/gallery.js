const { bold } = require('chalk');

module.exports = async (l, e, line, article) => {
  const regex = /\[gallery[^\]]*\]/gms;
  if (regex.exec(line)) {
    article.meta.errors.oldGallery = 'article has an old wordpress gallery';
  }
  return line;
};
