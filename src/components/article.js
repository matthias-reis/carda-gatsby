import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

import { Md } from './md';
import { font, space } from '../style';

import { Frame } from './frame';

const Headline = styled.h1`
  font-family: ${font.title};
  margin-top: ${space[3]};
  letter-spacing: -0.05em;
`;

export const Article = ({ md, meta }) => {
  console.log(md);
  return (
    <Frame>
      <Link to="/">〈 Homepage</Link>
      <Headline>{meta.title}</Headline>
      <Md>{md}</Md>
    </Frame>
  );
};
