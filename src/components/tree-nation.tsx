import styled from '@emotion/styled';
import * as React from 'react';
import { space } from '../style';

const TREENATION_ID = '60a4eb4357e45';

/*
<a href="https://tree-nation.com/profile/impact/rock-n-roll-vegan#co2" target="_blank" style="position:relative;cursor:pointer;display:block;z-index:999;">
<img src="https://tree-nation.com/images/tracking/label-co2-website-white-en.png" style="width:150px;height:auto;">
</a>
<script src="https://tree-nation.com/js/track.js"></script>
<script>treenation_track("60a4eb4357e45");</script>
*/

export const TreeNation: React.FC = () => {
  React.useEffect(() => {
    const url = `https://tree-nation.com/track/web/${TREENATION_ID}`;
    fetch(url);
  }, []);
  return (
    <TreeNationContainer>
      <TreeNationLink
        href="https://tree-nation.com/profile/impact/rock-n-roll-vegan#co2"
        target="_blank"
      >
        <TreeNationImage src="https://tree-nation.com/images/tracking/label-co2-website-black-en.png" />
      </TreeNationLink>
    </TreeNationContainer>
  );
};

const TreeNationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${space[3]};
`;

const TreeNationLink = styled.a`
  position: relative;
  cursor: pointer;
  display: block;
`;

const TreeNationImage = styled.img`
  width: 150px;
  height: auto;
`;
