import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

import { Md } from './md';

const ArticleContainer = styled('div')`
  margin: 50px auto;
  max-width: 630px;
  border: 6px solid black;
  padding: 20px;
`;

export const Article = ({ md, data }) => {
  console.log(data);

  return (
    <ArticleContainer>
      <Link to="/">> Homepage</Link>
      <Md>{md}</Md>
    </ArticleContainer>
  );
};
