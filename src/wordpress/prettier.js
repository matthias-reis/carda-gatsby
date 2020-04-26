const prettier = require('prettier');

const s = `
hier

## kommt
ein input

<p>hallo sdfsdf sdfsdfsdf sdfsdfsdfsd sdfsdfsdfsd <strong> sdfsdfsdf sdfsdfsdf sdfsdfsdf sdfdsfsdfsdf sdfsdfsdf sdfsdfsdf </strong></p>
`;

console.log(prettier.format(s, { parser: 'mdx', proseWrap: 'always' }));
