const { bold } = require('chalk');

module.exports = async (l, e, data) => {
  // we replace only the first h2
  const regex = /<h2[^>]*>(.+?)<\/h2>/;
  let hasMatch = false;
  for (const i in data.lines) {
    const match = regex.exec(data.lines[i]);
    if (match) {
      data.meta.subTitle = match[1];
      data.lines[i] = '';
      hasMatch = true;
      // we only need the first matching line
      break;
    }
  }
  if (!hasMatch) {
    data.meta.errors.noSubtitle = 'no h2 heading found - no sub title';
    e(bold(data.meta.fileName), 'no h2 heading found - no sub title');
  }

  return data;
};
