import * as React from 'react';
import styled from '@emotion/styled';

import { space } from '../style';

const MemeContainer = styled.div`
  border: 2px solid #ddd;
  background: #eee;
  padding: ${space[3]};
`;

export const Meme: React.FC = ({ children }) => (
  <MemeContainer>{children}</MemeContainer>
);
