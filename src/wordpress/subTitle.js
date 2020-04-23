const { bold } = require('chalk');

module.exports = async (l, e, data) => {
  // we replace only the first h2
  const regex = /<h2.*>(.+)<\/h2>/m;
  const match = regex.exec(data.content);

  if (match) {
    data.meta.subTitle = match[1];
    data.content = data.content.replace(regex, '');
  } else {
    // print a warning if no sub title is found
    e(
      data.meta.fileName,
      `${bold('no h2 heading found - no sub title')}
`
    );
  }
  return data;
};
