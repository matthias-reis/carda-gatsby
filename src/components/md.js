import React from 'react';

import { processor } from '../markdown';

export const Md = ({ children }) => {
  const processed = processor().processSync(children);
  return <>{processed.result}</>;
};
