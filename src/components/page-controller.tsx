import * as React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { graphql } from 'gatsby';

import { StaticPage } from './static-page';
import { ErrorBoundary } from './error-boundary';
import { Meme } from './meme';
import { Youtube, YouTube } from './youtube';
import { Vimeo } from './vimeo';
import { Playlist } from './playlist';
import { RemoteImage } from './remote-image';
import { Link } from './link';
import { Frame } from './frame';
import { Gallery } from './gallery';
import { H1, H2, H3, H4, H5, H6, P, Ul, Ol, Li, BlockQuote } from './typo';
import { HR } from './hr';
import { toCompactArticle } from '../to-compact-article';
import { Article } from '../types';

const shortcodes = {
  Meme,
  Playlist,
  RemoteImage,
  Gallery,
  Youtube,
  YouTube,
  Vimeo,
};

const defaults = {
  a: Link,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: P,
  ul: Ul,
  ol: Ol,
  li: Li,
  hr: HR,
  blockquote: BlockQuote,
};

const PageController: React.FC<{ data: ArticleQuery; path: string }> = ({
  data,
  path,
}) => {
  return (
    <MDXProvider components={{ ...defaults, ...shortcodes }}>
      <Frame>
        <ErrorBoundary>
          <StaticPage path={path} meta={data.mdx}>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </StaticPage>
        </ErrorBoundary>
      </Frame>
    </MDXProvider>
  );
};

export default PageController;

export const query = graphql`
  query PageQuery($id: String!) {
    mdx(id: { eq: $id }) {
      body
      fields {
        labels {
          slug
          title
          type
        }
        path
      }
      frontmatter {
        title
        subTitle
        date
        type
        typeName
        description
        remoteImage
        remoteLoadingImage
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

type ArticleQuery = {
  mdx: Article;
  allMdx: {
    nodes: Article[];
  };
};
