import * as React from 'react';
import { Helmet } from 'react-helmet';
import { pageView } from './analytics';
import type { Article } from '../types';

const SERVER = `https://cardamonchai.amreis.de`;

export const PageMeta: React.FC<{
  meta: Article;
  path: string;
}> = ({ meta, path }) => {
  React.useEffect(() => {
    pageView(meta.frontmatter.title, path);
  }, [meta, path]);
  return (
    <Helmet>
      <title>
        {meta.frontmatter.seoTitle || meta.frontmatter.title} | cardamonchai.com
      </title>
      <meta name="description" content={meta.frontmatter.description} />
      <link
        rel="canonical"
        href={`http://cardamonchai.com${meta.fields.path}`}
      />
      <meta
        property="og:locale"
        content={meta.frontmatter.language === 'en' ? 'en_GB' : 'de_DE'}
      />
      <meta property="og:type" content="article" />
      <meta
        property="og:title"
        content={
          meta.frontmatter.ogTitle ||
          meta.frontmatter.seoTitle ||
          meta.frontmatter.title
        }
      />
      <meta
        name="twitter:title"
        content={
          meta.frontmatter.ogTitle ||
          meta.frontmatter.seoTitle ||
          meta.frontmatter.title
        }
      />
      <meta property="og:description" content={meta.frontmatter.description} />
      <meta
        property="twitter:description"
        content={meta.frontmatter.description}
      />
      <meta property="og:url" content={`${SERVER}${meta.fields.path}`} />
      <meta property="article:author" content="www.facebook.com/cardamonchai" />
      <meta
        property="article:published_time"
        content={meta.frontmatter.date.toString()}
      />
      <meta
        property="og:image"
        content={`${SERVER}${meta.frontmatter.ogImage?.childImageSharp.original.src}`}
      />
      <meta
        property="twitter:image"
        content={`${SERVER}${meta.frontmatter.ogImage?.childImageSharp.original.src}`}
      />
      <meta
        property="og:image:width"
        content={meta.frontmatter.ogImage?.childImageSharp.original.width.toString()}
      />
      <meta
        property="og:image:height"
        content={meta.frontmatter.ogImage?.childImageSharp.original.height.toString()}
      />
    </Helmet>
  );
};
