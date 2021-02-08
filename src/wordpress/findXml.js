const { sync: glob } = require('glob');
const { join } = require('path');

module.exports = async (l, e, folder, globString) => {
  const globber = `${folder}/${globString}`;
  l(`globbing "${globber}"`);
  const files = glob(globber);
  l(`found ${files.length} analysable files`);
  return files;
};
