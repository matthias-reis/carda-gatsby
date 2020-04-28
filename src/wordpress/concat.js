const { bold } = require('chalk');

module.exports = async (l, e, data) => {
  data.content = data.lines.join('\n\n');
  return data;
};
