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

    writeFileSync(join(path, meta.fileName + suffix), md, {
      encoding: 'utf8',
    });
  } catch (err) {
    e(data.meta.fileName, err.message);
  }
};
