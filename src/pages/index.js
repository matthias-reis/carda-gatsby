import React from 'react';
import { graphql, Link } from 'gatsby';

const IndexPage = ({ data }) => {
  const articles = data.allMdx.nodes.filter(
    (node) => node.fields.type === 'article'
  );
  const pages = data.allMdx.nodes.filter((node) => node.fields.type === 'page');
  return (
    <div>
      <h1>Homepage</h1>
      <h2>Articles</h2>
      <ul>
        {articles.map(({ fields, frontmatter }) => {
          return (
            <li key={fields.path}>
              <Link to={fields.path}>{frontmatter.title}</Link>
            </li>
          );
        })}
      </ul>
      <h2>Pages</h2>
      <ul>
        {pages.map(({ fields, frontmatter }) => {
          return (
            <li key={fields.path}>
              <Link to={fields.path}>{frontmatter.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default IndexPage;

export const query = graphql`
  query HomePageQuery {
    allMdx {
      nodes {
        fields {
          path
          type
        }
        frontmatter {
          title
          subtitle
        }
      }
    }
  }
`;
