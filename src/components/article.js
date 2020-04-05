import React from 'react';
import { Link } from 'gatsby';

export const Article = ({ md, data }) => {
  console.log(data);

  return (
    <div>
      <Link to="/">> Homepage</Link>
      <pre>{md}</pre>
    </div>
  );
};
