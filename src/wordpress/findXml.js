const { sync: glob } = require('glob');
const { join } = require('path');

module.exports = async (l, e, folder) => {
  const globber = `${folder}/*.xml`;
  l(`globbing "${globber}"`);
  const files = glob(globber);
  l(`found ${files.length} analysable files`);
  return files;
};
