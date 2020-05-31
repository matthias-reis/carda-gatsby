import * as React from 'react';
import styled from '@emotion/styled';
import { color, fontSize, space } from '../style';
import { IconApplause } from './icons';

const Box = styled.div`
  margin-bottom: ${space[2]};
  color: ${color.neutral[3]};
`;

const Label = styled.div`
  font-size: ${fontSize[0]};
  line-height: 1;
`;

export const InteractionApplause: React.FC = () => (
  <Box>
    <IconApplause />
    <Label>applaudieren</Label>
  </Box>
);
