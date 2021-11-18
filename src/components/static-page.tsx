import React from 'react';
import styled from '@emotion/styled';

import { Title, Subtitle } from './typo';
import { Container } from './container';
import { FooterNavigation } from './footer-navigation';

import { space } from '../style';
import { Article as ArticleMeta, CompactArticle } from '../types';
import { CardaImage } from './carda-image';
import { PageMeta } from './page-meta';
import { ImageForArticle } from './image-for-article';

const ArticleContainer = Container.withComponent('article');

export const StaticPage: React.FC<StaticPageProps> = ({
  children,
  meta,
  path,
}) => {
  return (
    <div>
      <ArticleContainer>
        <PageMeta meta={meta} path={path} />
        <Title>{meta.frontmatter.title}</Title>
        {meta.frontmatter.subTitle && (
          <Subtitle>{meta.frontmatter.subTitle}</Subtitle>
        )}
        <ImageContainer>
          {meta.frontmatter.image && (
            <ImageForArticle src={meta.frontmatter.image} />
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
        <FooterNavigation />
      </ArticleFooter>
    </div>
  );
};

type StaticPageProps = {
  meta: ArticleMeta;
  path: string;
};

const ArticleFooter = styled.div`
  margin-top: ${space[4]};
`;

const ImageContainer = styled.div`
  margin-top: ${space[2]};
  margin-bottom: ${space[3]};
`;
