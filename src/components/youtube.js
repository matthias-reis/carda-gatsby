import React from 'react';
import styled from '@emotion/styled';
import { StaticQuery, graphql } from 'gatsby';

import { space, width } from '../style';

const YoutubeContainer = styled.div`
  height: ${width[3]};
  background: #ddd;
  margin: 0 0 ${space[1]} 0;
`;

export const Youtube = ({ id }) => {
  return (
    <YoutubeContainer>
      <h3>YOUTUBE</h3>
      <p>{id}</p>
    </YoutubeContainer>
  );
};
