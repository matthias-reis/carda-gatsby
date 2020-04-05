import React from 'react';
import styled from '@emotion/styled';

import { space, width } from '../style';

const PageContainer = styled.div`
  margin: ${space[3]} auto;
  max-width: ${width[4]};
  padding: ${space[1]};
`;

export const Frame = ({ children }) => {
  return <PageContainer>{children}</PageContainer>;
};
