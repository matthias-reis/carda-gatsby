const { writeFileSync } = require('fs');
const { join } = require('path');
const YAML = require('yaml');
const prettier = require('prettier');

module.exports = async (l, e, data, path) => {
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
      parser: 'markdown',
      proseWrap: 'always',
    });

    writeFileSync(join(path, meta.fileName), output, { encoding: 'utf8' });
  } catch (err) {
    e(data.meta.fileName, err.message);
    Object.entries(data.meta).map(([k, v]) =>
      console.log(`entry: ${k} => ${v}`)
    );
  }
};
