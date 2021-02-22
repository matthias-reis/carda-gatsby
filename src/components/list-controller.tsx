import * as React from 'react';
import { graphql } from 'gatsby';
import { Article, CompactArticle, ListQuery } from '../types';
import { Frame } from './frame';
import { ErrorBoundary } from './error-boundary';
import ListPage from './list-page';
import { FooterNavigation } from './footer-navigation';
import { toCompactArticle } from '../to-compact-article';
import { slugify } from '../gatsby/slugify';

const ListController: React.FC<{
  data: ListQuery;
  pageContext: { label: string };
}> = ({ data, pageContext }) => {
  const rawArticles: { node: Article }[] = data.allMdx.edges;

  const articles: CompactArticle[] = rawArticles.map(({ node }) => ({
    title: node.frontmatter.title,
    subTitle: node.frontmatter.subTitle,
    description: node.frontmatter.description,
    image: node.frontmatter.image,
    remoteLoadingImage: node.frontmatter.remoteLoadingImage,
    remoteThumbnailImage: node.frontmatter.remoteThumbnailImage,
    path: node.fields.path,
    date: new Date(node.frontmatter.date),
  }));

  return (
    <Frame>
      <ErrorBoundary>
        <ListPage
          topic="Stichwort"
          articles={articles}
          title={pageContext.label}
          path={`/tag/${slugify(pageContext.label)}`}
        />
        <FooterNavigation />
      </ErrorBoundary>
    </Frame>
  );
};

export default ListController;

export const query = graphql`
  query ListQuery($label: String!) {
    allMdx(filter: { fields: { labels: { eq: $label } } }) {
      edges {
        node {
          fields {
            path
          }
          frontmatter {
            title
            subTitle
            description
            date
            remoteLoadingImage
            remoteThumbnailImage
            image {
              childImageSharp {
                fluid(maxWidth: 400, quality: 70) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
