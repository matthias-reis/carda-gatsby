const { Parser } = require('xml2js');

module.exports = async (l, e, { file, content }) => {
  try {
    const parser = new Parser({
      normalize: false,
      trim: true,
      charkey: 'node',
      attrkey: 'attr',
      mergeAttrs: true,
    });
    const data = await parser.parseStringPromise(content);
    return data;
  } catch (error) {
    e(file, error);
    process.exit(1);
  }
};
