import React from 'react';
import { Link } from '@reach/router';

import { H1 } from './headline';

export const Article = ({ children, meta }) => {
  return (
    <>
      <Link to="/">〈 Homepage</Link>
      <H1>{meta.title}</H1>
      <div>{children}</div>
    </>
  );
};
