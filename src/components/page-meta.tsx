import * as React from 'react';
import { Helmet } from 'react-helmet';
import { pageView } from './analytics';
import { Imagine } from './imagine';
import type { Article } from '../types';

const SERVER = `https://soundsvegan.com`;

export const PageMeta: React.FC<{
  meta: Article;
  path: string;
}> = ({ meta, path }) => {
  React.useEffect(() => {
    pageView(meta.frontmatter.title, path);
  }, [meta, path]);
  let w = 1440;
  let h = 756;
  let ogImage = `/img/opengraph.jpg`;

  if (meta.frontmatter.ogImage) {
    const img = new Imagine(meta.frontmatter.ogImage);
    ogImage = img.getUrl(`1440.jpg`);
    w = img.meta.width;
    h = img.meta.height;
  }
  return (
    <Helmet>
      <title>
        {meta.frontmatter.seoTitle || meta.frontmatter.title} | Sounds Vegan
      </title>
      <meta name="description" content={meta.frontmatter.description} />
      <link
        rel="canonical"
        href={`https://soundsvegan.com${meta.fields.path}`}
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
      <meta
        property="article:published_time"
        content={meta.frontmatter.date.toString()}
      />
      <meta property="og:image" content={`${ogImage}`} />
      <meta property="twitter:image" content={`${ogImage}`} />
      //todo: add proper sizes based on image url
      <meta property="og:image:width" content={w.toString()} />
      <meta property="og:image:height" content={h.toString()} />
    </Helmet>
  );
};
