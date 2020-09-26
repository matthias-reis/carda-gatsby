import * as React from "react";
import { graphql } from "gatsby";
import { RawArticle, CompactArticle, ListQuery } from "../types";
import { Frame } from "./frame";
import { ErrorBoundary } from "./error-boundary";
import ListPage from "./list-page";

const ListController: React.FC<{
  data: ListQuery;
  pageContext: { label: string };
}> = ({ data, pageContext }) => {
  const rawArticles: { node: RawArticle }[] = data.allMdx.edges;

  const articles: CompactArticle[] = rawArticles.map(({ node }) => ({
    title: node.frontmatter.title,
    subTitle: node.frontmatter.subTitle,
    description: node.frontmatter.description,
    image: node.frontmatter.image,
    path: node.fields.path,
    date: new Date(node.frontmatter.date),
  }));
  return (
    <Frame>
      <ErrorBoundary>
        <ListPage articles={articles} title={pageContext.label} />
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
