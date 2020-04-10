const { createElement } = require('react');

const unified = require('unified');
const markdown = require('remark-parse');
const autolink = require('rehype-autolink-headings');
const remark2rehype = require('remark-rehype');
const raw = require('rehype-raw');
const rehype2react = require('rehype-react');

export const processor = (components) =>
  unified()
    .use(markdown, { commonmark: false })
    // .use(slug)
    .use(remark2rehype, { commonmark: false, allowDangerousHTML: true })
    // .use(autolink)
    .use(raw)
    .use(rehype2react, {
      createElement,
      components,
    });
