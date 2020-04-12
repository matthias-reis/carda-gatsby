import React from 'react';
import styled from '@emotion/styled';

import { space, width } from '../style';

const PlaylistContainer = styled.div`
  height: ${width[4]};
  background: #ddd;
  margin: 0 0 ${space[1]} 0;
`;

export const Playlist = ({ spotify, itunes }) => {
  return (
    <PlaylistContainer>
      <h3>PLAYLIST</h3>
      <p>{spotify}</p>
      <p>{itunes}</p>
    </PlaylistContainer>
  );
};
