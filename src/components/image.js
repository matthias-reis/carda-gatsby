import React from 'react';
import styled from '@emotion/styled';
import { StaticQuery, graphql } from 'gatsby';

import { space, width } from '../style';

const FloatingImageContainer = styled.div`
  width: ${width[3]};
  height: ${width[2]};
  background: #ddd;
  float: right;
  margin: 0 -${space[5]} ${space[1]} ${space[1]};
`;

const FixedImageContainer = styled.div`
  height: ${width[3]};
  background: #ddd;
  margin: 0 0 ${space[1]} 0;
`;

export default ({ alt, src, title }) => {
  const [altText, type] = alt.split(' | ');
  const Container =
    type === 'large' ? FixedImageContainer : FloatingImageContainer;

  return <Container>I M A G E</Container>;
};
