const { writeFileSync } = require('fs');

module.exports = async (l, e, media, path) => {
  writeFileSync(path, JSON.stringify(media, null, 2), {
    encoding: 'utf8',
  });
};
