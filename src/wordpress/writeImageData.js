const { writeFileSync } = require('fs');

module.exports = async (l, e, media, path) => {
  for (const image of Object.values(media.images)) {
    delete image.buffer;
    delete image.smallBuffer;
    delete image.mediumBuffer;
    delete image.largeBuffer;
  }
  writeFileSync(path, JSON.stringify(media, null, 2), {
    encoding: 'utf8',
  });
};
