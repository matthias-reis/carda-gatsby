import * as React from 'react';
import { graphql, Link } from 'gatsby';
import Image from 'gatsby-image';
import styled from '@emotion/styled';
import { RawArticle } from '../types';

const ItemList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
const Item = styled.li`
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

const LabelController: React.FC<{ data: LabelQuery }> = ({ data }) => {
  const articles = data.allMdx.edges;
  return (
    <>
      <Link to="/">〈 Homepage</Link>
      <ItemList>
        {articles.map(({ node }: LabelQueryNode) => (
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
};

export default LabelController;

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

type LabelQuery = {
  allMdx: {
    edges: LabelQueryNode[];
  };
};

type LabelQueryNode = {
  node: RawArticle;
};
