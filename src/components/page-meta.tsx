import * as React from 'react';
import { Helmet } from 'react-helmet';
import { pageView } from './analytics';

export const PageMeta: React.FC<{
  title: string;
  path: string;
  description?: string;
}> = ({ title, path, description }) => {
  React.useEffect(() => {
    pageView(title, path);
  }, [title, path]);
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};
