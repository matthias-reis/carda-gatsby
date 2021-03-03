import * as React from 'react';
import { graphql } from 'gatsby';
import { indexBy, prop, pick } from 'ramda';
import {
  Article,
  Category,
  CategoryNode,
  CompactArticle,
  ListQuery,
} from '../types';
import { Frame } from './frame';
import { ErrorBoundary } from './error-boundary';
import ListPage from './list-page';
import { FooterNavigation } from './footer-navigation';
import { toCompactArticle } from '../to-compact-article';
import { slugify } from '../gatsby/slugify';

const getExtract = pick(['title', 'slug']);

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

  const rawCategories: Category[] = data.allCategoriesYaml.edges.map(
    (e) => e.node
  );

  const categories: Record<string, Category> = indexBy(
    prop('slug'),
    rawCategories
  );

  for (const category of Object.values(categories)) {
    if (category.parentId && categories[category.parentId]) {
      category.parent = getExtract(categories[category.parentId]);
      categories[category.parentId].children = {
        ...categories[category.parentId].children,
        [category.slug]: category,
      };
    }
  }

  const currentCategory = categories[pageContext.label];

  let topic = 'Stichwort';

  if (currentCategory) {
    topic = 'Thema';
  }
  return (
    <Frame>
      <ErrorBoundary>
        <ListPage
          topic={topic}
          description={
            currentCategory ? currentCategory.description : undefined
          }
          childItems={currentCategory?.children ?? undefined}
          parentItem={currentCategory?.parent ?? undefined}
          articles={articles}
          title={currentCategory?.title ?? pageContext.label}
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
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { fields: { labels: { eq: $label } } }
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
    allCategoriesYaml {
      edges {
        node {
          slug
          title
          description
          parentId
          id
        }
      }
    }
  }
`;
