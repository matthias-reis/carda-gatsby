import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { graphql } from 'gatsby';

import { Article } from './article';
import { Meme } from './meme';
import { Link } from './link';

const shortcodes = { Meme };
const defaults = { a: Link };

export default function ArticleTemplate({ data }) {
  return (
    <MDXProvider components={{ ...defaults, ...shortcodes }}>
      <Article meta={data.mdx}>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </Article>
    </MDXProvider>
  );
}

export const articleQuery = graphql`
  query ArticleQuery($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        subtitle
        description
        image
      }
      id
    }
  }
`;
