const { writeFileSync } = require('fs');
const { join } = require('path');
const YAML = require('yaml');
const prettier = require('prettier');

module.exports = async (l, e, data, path, suffix = '') => {
  try {
    const { content, meta } = data;
    // transforming metadata to yaml
    const md = `---
${YAML.stringify(meta)}  
---

${content}
  `;

    const output = prettier.format(md, {
      printWidth: 80,
      parser: 'mdx',
      proseWrap: 'always',
    });

    writeFileSync(join(path, meta.fileName + suffix), output, {
      encoding: 'utf8',
    });
  } catch (err) {
    e(data.meta.fileName, err.message);
  }
};
