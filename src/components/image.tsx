import * as React from 'react';
import styled from '@emotion/styled';
import { useStaticQuery, graphql } from 'gatsby';
import GatsbyImage, { FluidObject } from 'gatsby-image';

import { Caption } from './caption';
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

const FloatingImageContainer = styled.span`
  display: block;
  width: ${width[3]};
  float: right;
  margin: 0 -${space[5]} ${space[1]} ${space[1]};
  & span {
    display: block;
  }
`;

const FixedImageContainer = styled.span`
  display: block;
  background: #ddd;
  margin: 0 0 ${space[1]} 0;
  & span {
    display: block;
  }
`;

const Image: React.FC<ImageProps> = ({ alt, src, title }) => {
  const [altText, type] = (alt || '').split(' | ');
  const Container =
    type === 'large' ? FixedImageContainer : FloatingImageContainer;

  const data = useStaticQuery(ALL_IMAGE_QUERY);
  const image = data.allFile.edges.find(
    (item: ImageQueryNode) => item.node.absolutePath.indexOf(src) > -1
  );

  if (!!image) {
    return (
      <Container>
        <GatsbyImage
          Tag="span"
          alt={altText}
          fluid={image.node.childImageSharp.fluid}
        />
        {title && <Caption>{title.replace(/\\/g, '')}</Caption>}
      </Container>
    );
  } else {
    return null;
  }
};

export default Image;

type ImageProps = {
  alt: string;
  src: string;
  title: string;
};

type ImageQuery = {
  allFile: {
    edges: ImageQueryNode[];
  };
};

type ImageQueryNode = {
  node: {
    absolutePath: string;
    childImageSharp: { fluid: FluidObject };
  };
};
