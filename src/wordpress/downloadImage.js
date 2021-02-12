const fetch = require('node-fetch');

module.exports = async (l, e, image, media) => {
  try {
    const res = await fetch(image.sourceUrl);
    const buffer = await res.arrayBuffer();
    image.buffer = Buffer.from(buffer, 'binary');
  } catch (err) {
    e(err.message);
    image.error = err.message;
    media.errors[image.id] = err.message;
  }
};
