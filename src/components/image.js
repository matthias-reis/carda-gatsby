import React from 'react';
import styled from '@emotion/styled';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

import { space, width } from '../style';

const ALL_IMAGE_QUERY = graphql`
  query AllImageQuery {
    allFile {
      edges {
        node {
          absolutePath
          childImageSharp {
            fluid(maxWidth: 1024) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

const FloatingImageContainer = styled.div`
  width: ${width[3]};
  background: #ddd;
  float: right;
  margin: 0 -${space[5]} ${space[1]} ${space[1]};
`;

const FixedImageContainer = styled.div`
  background: #ddd;
  margin: 0 0 ${space[1]} 0;
`;

export default ({ alt, src, title }) => {
  const [altText, type] = alt.split(' | ');
  const Container =
    type === 'large' ? FixedImageContainer : FloatingImageContainer;

  const data = useStaticQuery(ALL_IMAGE_QUERY);
  const node = data.allFile.edges.find(
    item => item.node.absolutePath.indexOf(src) > -1
  );
  if (!!node) {
    return (
      <Container>
        <Image fluid={node.childImageSharp.fluid} />
      </Container>
    );
  } else {
    return null;
  }
};
