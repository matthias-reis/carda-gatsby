const { writeFileSync } = require('fs');
const { join } = require('path');
const YAML = require('yaml');
const prettier = require('prettier');

module.exports = async (l, e, data, path) => {
  const { content, meta } = data;
  // transforming metadata to yaml
  const md = `---
${YAML.stringify(meta)}  
---

${content}
  `;

  const output = prettier.format(md, {
    printWidth: 80,
    parser: 'markdown',
    proseWrap: 'always',
  });

  writeFileSync(join(path, meta.fileName), output, { encoding: 'utf8' });
};
