import React from 'react';

import { Article } from './article';
import { ErrorBoundary } from './error-boundary';
import { processor } from '../markdown';

const ArticleCmsController = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS();
  if (data) {
    const { body, ...meta } = data;
    try {
      const processed = processor().processSync(body);
      return (
        <ErrorBoundary>
          <Article meta={meta}>
            <h1>test</h1>
            {processed.result}
          </Article>
        </ErrorBoundary>
      );
    } catch (e) {
      console.error(e);
      return <div>Error...</div>;
    }
  } else {
    return <div>Loading...</div>;
  }
};

export default ArticleCmsController;
