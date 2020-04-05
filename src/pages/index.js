import React from 'react';
import { graphql, Link } from 'gatsby';

const IndexPage = ({ data }) => {
  return (
    <div>
      <h1>Homepage</h1>
      <ul>
        {data.allSitePage.edges.map(({ node }) => {
          return (
            node.path && (
              <li key={node.path}>
                <Link to={node.path}>{node.context.title}</Link>
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
};

export default IndexPage;

export const query = graphql`
  query HomePageQuery {
    allSitePage {
      edges {
        node {
          path
          context {
            title
          }
        }
      }
    }
  }
`;
