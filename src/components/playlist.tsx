import * as React from 'react';
import styled from '@emotion/styled';

import { space, width, breakpoints } from '../style';

import itunesImage from '../assets/itunes.png';
import spotifyImage from '../assets/spotify.png';

const PlaylistContainer = styled.div`
  height: ${width[4]};
  margin: 0 -${space[4]} ${space[1]} -${space[4]};
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  @media (max-width: ${breakpoints.navFold}) {
    margin: 0 0 ${space[1]} 0;
    flex-direction: column;
  }
`;

const TypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 auto;
  iframe {
    flex: 1 1 auto;
    margin: 0 ${space[2]};
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  height: 80px;
  & img {
    width: 120px;
    margin: 0;
  }
`;

export const Playlist: React.FC<{ spotify: string; itunes: string }> = ({
  spotify,
  itunes,
}) => {
  return (
    <PlaylistContainer>
      {spotify && (
        <TypeContainer>
          <IconContainer>
            <img src={spotifyImage} alt="spotify" />
          </IconContainer>
          <iframe
            title="Spotify Playlist"
            src={`https://open.spotify.com/embed/playlist/${spotify}`}
            frameBorder="0"
          />
        </TypeContainer>
      )}
      {itunes && (
        <TypeContainer>
          <IconContainer>
            <img src={itunesImage} alt="itunes" />
          </IconContainer>
          <iframe
            title="iTunes Playlist"
            src={`https://embed.music.apple.com/de/playlist/${itunes}`}
            frameBorder="0"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          />
        </TypeContainer>
      )}
    </PlaylistContainer>
  );
};
