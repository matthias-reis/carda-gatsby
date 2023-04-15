import * as React from 'react';
import { graphql } from 'gatsby';
import { Frame } from '../components/frame';
import { isProduction } from '../is-production';
import { ErrorBoundary } from '../components/error-boundary';
import { HomePage } from '../components/home-page';
import { ListQuery, Article, CompactArticle } from '../types';
import { toCompactArticle } from '../to-compact-article';

const HomePageController: React.FC<{ data: ListQuery }> = ({ data }) => {
  const rawArticles: { node: Article }[] = data?.allMdx.edges ?? [];

  const articles: CompactArticle[] = rawArticles
    .filter(({ node }) =>
      isProduction ? new Date(node.frontmatter.date) < new Date() : true
    )
    .map(({ node }) => node)
    .map(toCompactArticle);

  return (
    <Frame skipLogo>
      <ErrorBoundary>
        <HomePage articles={articles} />
      </ErrorBoundary>
    </Frame>
  );
};

export default HomePageController;

export const query = graphql`
  query HomeQuery {
    allMdx(
      limit: 23
      sort: { fields: frontmatter___date, order: DESC }
      filter: {
        frontmatter: { language: { ne: "en" } }
        fields: { type: { in: ["article", "wordpress"] } }
      }
    ) {
      edges {
        node {
          fields {
            path
          }
          frontmatter {
            title
            subTitle
            description
            excerpt
            type
            typeName
            date
            remoteLoadingImage
            remoteThumbnailImage
            languageLink
            advertisement
            affiliate
            image
          }
        }
      }
    }
  }
`;
