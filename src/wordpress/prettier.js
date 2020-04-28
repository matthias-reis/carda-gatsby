const prettier = require('prettier');

module.exports = async (l, e, data, parser = 'mdx') => {
  // we parse with the mdx option first to get well formed stuff
  data.content = prettier.format(data.content, {
    printWidth: 80,
    parser: 'markdown',
    proseWrap: 'always',
  });
  return data;
};
