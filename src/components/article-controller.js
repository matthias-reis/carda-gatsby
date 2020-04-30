import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { graphql } from 'gatsby';

import { Article } from './article';
import { ErrorBoundary } from './error-boundary';
import { Meme } from './meme';
import { Youtube } from './youtube';
import { Playlist } from './playlist';
import Image from './image';
import { Link } from './link';
import { Frame } from './frame';

const shortcodes = { Meme, Youtube, Playlist };
const defaults = { a: Link, img: Image };

export default function ArticleController({ data }) {
  return (
    <MDXProvider components={{ ...defaults, ...shortcodes }}>
      <Frame>
        <ErrorBoundary>
          <Article meta={{ ...data.mdx.frontmatter, ...data.mdx.fields }}>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </Article>
        </ErrorBoundary>
      </Frame>
    </MDXProvider>
  );
}

export const query = graphql`
  query ArticleQuery($id: String!) {
    mdx(id: { eq: $id }) {
      body
      fields {
        labels
      }
      frontmatter {
        title
        subTitle
        path
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
