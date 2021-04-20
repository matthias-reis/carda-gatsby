import * as React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { graphql } from 'gatsby';

import { ArticlePage } from './article-page';
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
import { Article, CompactArticle } from '../types';

const shortcodes = {
  Meme,
  Youtube,
  YouTube,
  Vimeo,
  Playlist,
  RemoteImage,
  Gallery,
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

const ArticleController: React.FC<{
  data: ArticleQuery;
  path: string;
  pageContext: { series: Record<string, CompactArticle[]> };
}> = ({ data, path, pageContext }) => {
  const recommendations = data.allMdx.nodes.map(toCompactArticle);
  return (
    <MDXProvider components={{ ...defaults, ...shortcodes }}>
      <Frame>
        <ErrorBoundary>
          <ArticlePage
            path={path}
            meta={data.mdx}
            recommendations={recommendations}
            series={pageContext.series}
          >
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </ArticlePage>
        </ErrorBoundary>
      </Frame>
    </MDXProvider>
  );
};

export default ArticleController;

export const query = graphql`
  query ArticleQuery($id: String!, $recommendations: [String]) {
    mdx(id: { eq: $id }) {
      body
      fields {
        labels
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
        language
        languageLink
        image {
          childImageSharp {
            fluid(maxWidth: 900, quality: 70) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      id
      timeToRead
    }
    allMdx(filter: { id: { in: $recommendations } }) {
      nodes {
        fields {
          path
        }
        frontmatter {
          title
          subTitle
          description
          date
          remoteThumbnailImage
          remoteLoadingImage
          language
          languageLink
          image {
            childImageSharp {
              fluid(maxWidth: 900, quality: 70) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;

type ArticleQuery = {
  mdx: Article;
  allMdx: {
    nodes: Article[];
  };
};
