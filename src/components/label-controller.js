import React from 'react';
import { graphql, Link } from 'gatsby';
import Image from 'gatsby-image';
import styled from '@emotion/styled';

const ItemList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
const Item = styled.ul`
  flex: 1 1 auto;
  width: 300px;
  border: 1px solid red;
  border-radius: 4px;
  padding: 20px;
  margin: 4px;
`;

const EmptyItem = styled.div`
  flex: 1 1 auto;
  width: 300px;
`;

export default function labelController({ data }) {
  const articles = data.allMdx.edges;
  console.log(data);
  return (
    <>
      <Link to="/">〈 Homepage</Link>
      <ItemList>
        {articles.map(({ node }) => (
          <Item key={node.fields.path}>
            <Link to={node.fields.path}>
              {node.frontmatter.image && (
                <div>
                  <Image fluid={node.frontmatter.image.childImageSharp.fluid} />
                </div>
              )}
              <h2>{node.frontmatter.title}</h2>
              <p>
                <strong>{node.frontmatter.subTitle}</strong>
              </p>
            </Link>
          </Item>
        ))}
        {Array(5)
          .fill('')
          .map((_, i) => (
            <EmptyItem key={i} />
          ))}
      </ItemList>
    </>
  );
}

export const query = graphql`
  query LabelQuery($label: String!) {
    allMdx(filter: { fields: { labels: { eq: $label } } }) {
      edges {
        node {
          fields {
            path
          }
          frontmatter {
            title
            subtitle
            subTitle
            description
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
