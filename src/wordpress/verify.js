const mdx = require('@mdx-js/mdx');
const { bold } = require('chalk');

let counter = 0;

module.exports = async (l, e, data) => {
  try {
    const transpiled = await mdx(data.content);
  } catch (error) {
    counter++;
    const message = error.message.split('\n')[0];
    data.content = `## ${message}

<!--
${data.content}
-->
`;
    data.meta.errors.push({ type: 'invalidMdx', message });
    data.status = 'invalid';
    e(counter, bold(data.meta.fileName), message);
  }

  return data;
};
