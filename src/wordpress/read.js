const { resolve } = require('path');
const { bold, green } = require('chalk');
const { readFileSync } = require('fs');

module.exports = (l, e, file) => {
  const content = readFileSync(file, 'utf8');
  l(`${green(parseInt(content.length / 1024))} kB for file ${bold(file)}`);
  return { file, content };
};
