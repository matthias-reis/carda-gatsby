const { writeFileSync } = require('fs');

module.exports = async (l, e, imageData, path) => {
  writeFileSync(path, JSON.stringify(imageData, null, 2), {
    encoding: 'utf8',
  });
};
