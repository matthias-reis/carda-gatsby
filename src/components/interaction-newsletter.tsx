import * as React from 'react';
import styled from '@emotion/styled';
import { color, fontSize, space } from '../style';
import { IconNewsletter } from './icons';

const Box = styled.a`
  display: block;
  margin-bottom: ${space[2]};
  color: ${color.text20};

  @media (max-width: 959px) {
    display: none;
  }
`;

const Label = styled.div`
  font-size: ${fontSize[0]};
  line-height: 1;
`;

export const InteractionNewsletter: React.FC = () => (
  <Box target="_blank" href="https://mailchi.mp/94bdbb6fded3/cardamonchai">
    <IconNewsletter />
    <Label>Newsletter</Label>
  </Box>
);
