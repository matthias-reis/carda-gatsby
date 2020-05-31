import * as React from 'react';

const PagePreview: React.FC<any> = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS();
  if (data) {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  } else {
    return <div>Loading...</div>;
  }
};

export default PagePreview;
