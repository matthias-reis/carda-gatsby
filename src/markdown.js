const { createElement } = require('react');

const unified = require('unified');
const markdown = require('remark-parse');
const remark2rehype = require('remark-rehype');
const raw = require('rehype-raw');
const rehype2react = require('rehype-react');

export const processor = components =>
  unified()
    .use(markdown, { commonmark: false })
    .use(remark2rehype, { commonmark: false, allowDangerousHtml: true })
    .use(raw)
    .use(rehype2react, {
      createElement,
      components
    });
