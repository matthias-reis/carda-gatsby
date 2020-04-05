import React from 'react';

const ArticlePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS();
  console.log(data);
  if (data) {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  } else {
    return <div>Loading...</div>;
  }
};

export default ArticlePreview;
