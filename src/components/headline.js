import styled from '@emotion/styled';
import { font, space, color } from '../style';

const BaseTitle = styled.h1`
  text-align: center;
  font-family: ${font.title};
  font-weight: 300;
  margin-bottom: 0;
  letter-spacing: -0.05em;
  line-height: 1.1;
`;

export const Title = styled(BaseTitle)`
  font-size: 2.8em;
  margin-top: ${space[4]};
`;

export const Subtitle = styled(BaseTitle)`
  font-size: 1.8em;
  color: ${color.neutral[2]};
`.withComponent('p');

export const H2 = styled.h2`
  font-family: ${font.heading};
  margin-top: ${space[3]};
`;

export const H3 = styled.h3`
  font-family: ${font.heading};
  margin-top: ${space[2]};
`;
