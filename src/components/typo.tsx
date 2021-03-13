import styled from '@emotion/styled';
import { font, fontSize, space, color, line } from '../style';

const BaseTitle = styled.h1`
  text-align: center;
  font-family: ${font.title};
  margin-bottom: 0;
  letter-spacing: -0.05em;
  line-height: 1.1;
`;

export const Title = styled(BaseTitle)`
  font-size: ${fontSize[9]};
  font-weight: 300;
`;

export const Subtitle = styled(BaseTitle)`
  font-size: ${fontSize[5]};
  color: ${color.neutral[3]};
  font-weight: 300;
  margin: 0 0 ${space[3]} 0;
`.withComponent('p');

export const CompactTitle = styled(BaseTitle)`
  font-size: ${fontSize[5]};
  color: ${color.text10};
  font-weight: 300;
  text-align: left;
`;

export const CompactSubtitle = styled(BaseTitle)`
  font-size: ${fontSize[3]};
  color: ${color.text30};
  font-weight: 300;
  margin: ${space[1]} 0 ${space[2]} 0;
  text-align: left;
`.withComponent('p');

export const H1 = styled.h2`
  font-family: ${font.heading};
  line-height: ${line.dense};
  font-size: ${fontSize[8]};
  margin-top: ${space[4]};
  margin-bottom: ${space[2]};
`;

export const H2 = styled.h2`
  font-family: ${font.heading};
  line-height: ${line.dense};
  font-size: ${fontSize[6]};
  margin-top: ${space[3]};
  margin-bottom: ${space[2]};
`;

export const H3 = styled.h3`
  font-family: ${font.heading};
  line-height: ${line.dense};
  font-size: ${fontSize[4]};
  margin-top: ${space[3]};
  margin-bottom: ${space[1]};
`;

export const H3Deco = styled.h3`
  color: ${color.text10};
  font-family: ${font.title};
  line-height: ${line.dense};
  font-size: ${fontSize[6]};
  margin-top: ${space[2]};
  margin-bottom: ${space[1]};
`;

export const H4 = styled.h4`
  font-family: ${font.heading};
  line-height: ${line.dense};
  font-size: ${fontSize[3]};
  margin-top: ${space[2]};
  margin-bottom: ${space[1]};
`;

export const H5 = styled.h5`
  font-family: ${font.heading};
  line-height: ${line.dense};
  font-size: ${fontSize[3]};
  font-weight: 300;
  margin-top: ${space[2]};
  margin-bottom: ${space[1]};
`;

export const H6 = styled.h6`
  font-family: ${font.heading};
  line-height: ${line.dense};
  font-weight: 300;
  font-size: ${fontSize[2]};
  margin-top: ${space[2]};
  margin-bottom: ${space[1]};
`;

export const P = styled.p`
  margin-top: ${space[2]};
  margin-bottom: ${space[1]};
`;

export const S = styled.p`
  margin-top: ${space[1]};
  margin-bottom: ${space[1]};
  font-size: ${fontSize[2]};
`;

export const Ul = styled.ul`
  margin: ${space[1]} 0;
  padding-left: ${space[2]};
  list-style-type: square;
`;

export const Ol = styled.ol`
  margin: ${space[1]} 0;
  padding-left: ${space[2]};
`;

export const Li = styled.li`
  margin: ${space[0]} 0;
`;

export const BlockQuote = styled.blockquote`
  margin: ${space[1]} 0;
  padding-left: ${space[2]};
  border-left: ${space[0]} solid ${color.cold[3]};
  font-style: italic;
`;
