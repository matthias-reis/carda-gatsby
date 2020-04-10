import styled from '@emotion/styled';
import { font, space } from '../style';

export const H1 = styled.h1`
  font-size: 2.5em;
  font-family: ${font.title};
  font-weight: 300;
  margin-top: ${space[4]};
  margin-bottom: ${space[3]};
  letter-spacing: -0.05em;
`;

export const H2 = styled.h2`
  font-family: ${font.heading};
  margin-top: ${space[3]};
`;

export const H3 = styled.h3`
  font-family: ${font.heading};
  margin-top: ${space[2]};
`;
