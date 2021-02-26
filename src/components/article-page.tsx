import React from 'react';
import styled from '@emotion/styled';
import Image from 'gatsby-image';

import { Link } from './link';
import { Interactions } from './interactions';
import { Title, Subtitle } from './typo';
import { HR } from './hr';
import { Container } from './container';
import { ArticleCrossLinkSection } from './article-crosslink-section';
import { FooterNavigation } from './footer-navigation';
import { InteractionDetails } from './interaction-details';

import { space, color } from '../style';
import { Article as ArticleMeta, CompactArticle } from '../types';
import { CardaImage } from './carda-image';
import { PageMeta } from './page-meta';

const ArticleContainer = Container.withComponent('article');

const zeroPad = (val: string | number, digits: number) =>
  `${Array(digits).fill(0).join()}${val}`.slice(-digits);

const getType = (meta: ArticleMeta) => {
  let ret = 'Beitrag';
  if (
    meta.frontmatter.type &&
    meta.frontmatter.type !== 'Artikel' &&
    meta.frontmatter.type !== 'Standard'
  ) {
    ret = meta.frontmatter.type;
  }
  if (meta.frontmatter.typeName) {
    ret = meta.frontmatter.typeName;
  }
  return ret;
};

export const ArticlePage: React.FC<ArticleProps> = ({
  children,
  meta,
  recommendations,
  path,
}) => {
  const date = new Date(meta.frontmatter.date);
  const formattedDate = `${zeroPad(date.getDate(), 2)}.${zeroPad(
    date.getMonth() + 1,
    2
  )}.${date.getFullYear()}`;
  return (
    <div>
      <ArticleContainer>
        <PageMeta title={meta.frontmatter.title} path={path} />
        <Interactions meta={meta} />
        <Meta>
          {getType(meta)} vom {formattedDate} ·{' '}
          <CurrentLink href={`https://cardamonchai.com${meta.fields.path}`}>
            im alten Blog
          </CurrentLink>
        </Meta>
        <HR />
        <Title>{meta.frontmatter.title}</Title>
        {meta.frontmatter.subTitle && (
          <Subtitle>{meta.frontmatter.subTitle}</Subtitle>
        )}
        <ImageContainer>
          {meta.frontmatter.image && (
            <Image fluid={meta.frontmatter.image.childImageSharp.fluid} />
          )}
          {meta.frontmatter.remoteImage && (
            <CardaImage
              loading={meta.frontmatter.remoteLoadingImage || ''}
              src={meta.frontmatter.remoteImage}
              alt={meta.frontmatter.title}
            />
          )}
        </ImageContainer>
        <div>{children}</div>
      </ArticleContainer>
      <ArticleFooter>
        <InteractionDetails meta={meta} />
        <ArticleCrossLinkSection
          meta={meta}
          recommendations={recommendations}
        />
        <FooterNavigation />
      </ArticleFooter>
    </div>
  );
};

type ArticleProps = {
  meta: ArticleMeta;
  recommendations: CompactArticle[];
  path: string;
};

const ArticleFooter = styled.div`
  margin-top: ${space[4]};
`;

const ImageContainer = styled.div`
  margin-top: ${space[2]};
  margin-bottom: ${space[3]};
`;

const Label = styled(Link)`
  display: inline-block;
  border: 1px solid blue;
  border-radius: 3px;
  padding: 0 4px;
  margin: 0 4px 4px 0;
  color: black;
  text-decoration: none;
`;

const Meta = styled.p`
  margin: 0 0 ${space[2]} 0;
  color: ${color.neutral[3]};
  text-align: center;
`;

const CurrentLink = styled.a`
  color: ${color.cold[0]};
`;
