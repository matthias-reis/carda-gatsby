import React from 'react';
import styled from '@emotion/styled';
import { graphql, Link } from 'gatsby';

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
`;

const Item = styled.li`
  flex: 1 1 auto;
  width: 300px;
  border: 1px solid red;
  padding: 20px;
  margin: 4px;
`;

const IndexPage = ({ data }) => {
  const articles = data.allMdx.nodes.filter(
    (node) => node.fields.type === 'article'
  );
  const pages = data.allMdx.nodes.filter((node) => node.fields.type === 'page');
  const wordpress = data.allMdx.nodes.filter(
    (node) => node.fields.type === 'wordpress'
  );
  return (
    <div>
      <h1>Homepage</h1>
      <h2>Articles</h2>
      <List>
        {articles.map(({ fields, frontmatter }) => {
          return (
            <Item key={fields.path}>
              <Link to={fields.path}>
                <p>{frontmatter.date}</p>
                <p>{frontmatter.title}</p>
                <p>{frontmatter.subTitle}</p>
              </Link>
            </Item>
          );
        })}
      </List>
      <h2>Pages</h2>
      <List>
        {pages.map(({ fields, frontmatter }) => {
          return (
            <Item key={fields.path}>
              <Link to={fields.path}>
                <p>{frontmatter.date}</p>
                <p>{frontmatter.title}</p>
                <p>{frontmatter.subTitle}</p>
              </Link>
            </Item>
          );
        })}
      </List>
      <h2>Wordpress</h2>
      <List>
        {wordpress.map(({ fields, frontmatter }) => {
          return (
            <Item key={fields.path}>
              <Link to={fields.path}>
                <p>
                  <small>{frontmatter.date}</small>
                </p>
                <p>
                  <strong>{frontmatter.title}</strong>
                </p>
                <p>{frontmatter.subTitle}</p>
              </Link>
            </Item>
          );
        })}
      </List>
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
          date(formatString: "YYYY-MM-DD")
          title
          subTitle
        }
      }
    }
  }
`;
