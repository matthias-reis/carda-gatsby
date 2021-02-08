const { resolve } = require('path');
const { writeFileSync } = require('fs');

const BASE_PATH = '/Users/matthias.reis/Documents/imagetest';

module.exports = async (
  l,
  e,
  { smallBuffer, mediumBuffer, largeBuffer, base64Buffer, ...image }
) => {
  const smallFile = resolve(BASE_PATH, `${image.id}-small.jpg`);
  const mediumFile = resolve(BASE_PATH, `${image.id}-medium.jpg`);
  const largeFile = resolve(BASE_PATH, `${image.id}-large.jpg`);

  writeFileSync(smallFile, smallBuffer);
  writeFileSync(mediumFile, mediumBuffer);
  writeFileSync(largeFile, largeBuffer);

  return { ...image, base64: base64Buffer.toString('base64') };
};
