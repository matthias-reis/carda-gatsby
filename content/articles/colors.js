import * as React from 'react';
import styled from '@emotion/styled';
import { color } from '../../src/style';

const Line = styled.div`
  display: flex;
  & > div {
    height: 4rem;
    flex: 1 1 auto;
  }
`;

export const Colors = ({ palette }) => {
  const colors = color[palette];
  return (
    <Line>
      {colors.map((color) => (
        <div style={{ background: color }}>&nbsp;</div>
      ))}
    </Line>
  );
};
