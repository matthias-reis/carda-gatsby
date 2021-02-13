const fetch = require('node-fetch');

module.exports = async (l, e, image, media) => {
  try {
    const res = await fetch(encodeURI(image.sourceUrl));
    const buffer = await res.arrayBuffer();
    image.buffer = Buffer.from(buffer, 'binary');
    image.error = null;
    image.processed = true;
  } catch (err) {
    e(err.message);
    image.error = err.message;
    image.processed = false;
    media.errors[image.id] = err.message;
  }
};
