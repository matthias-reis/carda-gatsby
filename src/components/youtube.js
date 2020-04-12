import React from 'react';
import styled from '@emotion/styled';

import { Caption } from './caption';

import { space } from '../style';

const YoutubeContainer = styled.div`
  height: 0;
  padding-bottom: 56.25%;
  position: relative;
  margin: 0 0 ${space[1]} 0;
  iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const Youtube = ({ id, caption }) => {
  return (
    <figure>
      <YoutubeContainer>
        <iframe
          title={`Youtube Video ${id}`}
          src={`https://www.youtube.com/embed/${id}`}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </YoutubeContainer>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
};
