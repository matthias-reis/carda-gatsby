import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { graphql } from 'gatsby';

import { Article } from './article';
import { Meme } from './meme';
import { Image } from './image';
import { Link } from './link';
import { Frame } from './frame';

const shortcodes = { Meme };
const defaults = { a: Link, img: Image };

export default function ArticleController({ data }) {
  return (
    <MDXProvider components={{ ...defaults, ...shortcodes }}>
      <Frame>
        <Article meta={data.mdx.frontmatter}>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </Article>
      </Frame>
    </MDXProvider>
  );
}

export const query = graphql`
  query ArticleQuery($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        subtitle
        description
        image {
          childImageSharp {
            fluid(maxWidth: 900, quality: 70) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      id
    }
  }
`;
