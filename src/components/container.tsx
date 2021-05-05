import * as React from 'react';
import styled from '@emotion/styled';
import { space, width } from '../style';

export const Container = styled.div<{ large?: boolean }>`
  position: relative;
  padding: 1px ${space[1]};
  margin: 0 auto;
  max-width: ${({ large }) => (large ? width[5] : width[4])};
`;
