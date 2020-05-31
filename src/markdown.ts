import { createElement } from 'react';

import unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import raw from 'rehype-raw';
import rehype2react from 'rehype-react';

export const processor = (components: { [key: string]: React.FC }) =>
  unified()
    .use(markdown, { commonmark: false })
    .use(remark2rehype, { commonmark: false, allowDangerousHtml: true })
    .use(raw)
    .use(rehype2react as any, {
      createElement,
      components,
    });
