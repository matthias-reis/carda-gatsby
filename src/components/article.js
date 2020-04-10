import React from 'react';
import { Link } from 'gatsby';

import { H1 } from './headline';
import { Frame } from './frame';

export const Article = ({ children, meta }) => {
  return (
    <Frame>
      <Link to="/">〈 Homepage</Link>
      <H1>{meta.frontmatter.title}</H1>
      <div>{children}</div>
    </Frame>
  );
};
