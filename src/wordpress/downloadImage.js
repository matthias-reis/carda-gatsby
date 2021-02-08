const fetch = require('node-fetch');

module.exports = async (l, e, image) => {
  const res = await fetch(image.sourceUrl);
  const buffer = await res.buffer();
  return { ...image, buffer };
};
