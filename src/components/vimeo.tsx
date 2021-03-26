import * as React from 'react';
import styled from '@emotion/styled';

import { Caption } from './caption';

import { space } from '../style';

const Figure = styled.figure`
  margin: 0;
`;

const VimeoContainer = styled.div`
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

export const Vimeo: React.FC<{ id: string; caption: string }> = ({
  id,
  caption,
}) => {
  return (
    <Figure>
      <VimeoContainer>
        <iframe
          title={`Vimeo Video ${id}`}
          src={`https://player.vimeo.com/video/${id}`}
          frameBorder="0"
          allowFullScreen
        />
      </VimeoContainer>
      {caption && <Caption>{caption}</Caption>}
    </Figure>
  );
};
