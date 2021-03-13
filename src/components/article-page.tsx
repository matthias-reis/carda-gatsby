import React from 'react';
import styled from '@emotion/styled';
import Image from 'gatsby-image';
import { Link as GatsbyLink } from 'gatsby';

import { Link } from './link';
import { Interactions } from './interactions';
import { Title, Subtitle } from './typo';
import { HR } from './hr';
import { Container } from './container';
import { ArticleSeries } from './article-series';
import { ArticleLabels } from './article-labels';
import { ArticleComments } from './article-comments';
import { ArticleRecommendations } from './article-recommendations';
import { FooterNavigation } from './footer-navigation';

import { space, color, fontSize } from '../style';
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
  series,
  path,
}) => {
  const date = new Date(meta.frontmatter.date);
  const formattedDate = `${zeroPad(date.getDate(), 2)}.${zeroPad(
    date.getMonth() + 1,
    2
  )}.${date.getFullYear()}`;
  return (
    <div>
      <PageMeta title={meta.frontmatter.title} path={path} />
      <Interactions meta={meta} />
      <ArticleContainer>
        <Title>{meta.frontmatter.title}</Title>
        {meta.frontmatter.subTitle && (
          <Subtitle>{meta.frontmatter.subTitle}</Subtitle>
        )}
        <MetaArea>
          <Icon />
          <Meta>
            <div>
              {getType(meta)} von Anne &mdash;{' '}
              <Link href={`https://cardamonchai.com${meta.fields.path}`}>
                im alten Blog
              </Link>
            </div>
            <div>
              {formattedDate} &mdash; Lesezeit: {meta.timeToRead} min
            </div>
          </Meta>
          {meta.frontmatter.links?.de && (
            <LanguageArea>
              <Language to={meta.frontmatter.links?.de}>
                Deutsche Version lesen
              </Language>
            </LanguageArea>
          )}
          {meta.frontmatter.links?.en && (
            <LanguageArea>
              <Language to={meta.frontmatter.links?.en}>
                🇬🇧&nbsp;Read&nbsp;English&nbsp;Version
              </Language>
            </LanguageArea>
          )}
        </MetaArea>
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
        <ArticleSeries series={series} />
        <ArticleLabels labels={meta.fields.labels} />
        <ArticleComments meta={meta} />
        <ArticleRecommendations recommendations={recommendations} />
        <FooterNavigation />
      </ArticleFooter>
    </div>
  );
};

type ArticleProps = {
  meta: ArticleMeta;
  recommendations: CompactArticle[];
  path: string;
  series: Record<string, CompactArticle[]>;
};

const Icon = styled.div`
  background: ${color.overlay30};
  height: 36px;
  width: 36px;
  border-radius: 18px;
  margin-right: ${space[1]};
  flex: 0 0 auto;
`;

const MetaArea = styled.div`
  display: flex;
  align-items: center;
`;

const Meta = styled.div`
  flex: 1 1 auto;
  color: ${color.text30};
  font-size: ${fontSize[2]};
`;

const LanguageArea = styled.div`
  display: flex;
  justify-content: center;
  align-self: flex-end;
  flex: 0 0 auto;
`;

const Language = styled(GatsbyLink)`
  text-decoration: none;
  border: 1px solid ${color.border30};
  height: 24px;
  font-size: ${fontSize[2]};
  padding: ${space[0]} ${space[2]};
  margin-top: ${space[2]};
  border-radius: 16px;
  color: ${color.text20};
  flex: 0 0 auto;

  &:hover {
    color: ${color.text10};
    background: ${color.overlay10};
  }
`;

const ArticleFooter = styled.div`
  margin-top: ${space[4]};
`;

const ImageContainer = styled.div`
  margin-top: ${space[2]};
  margin-bottom: ${space[3]};
`;
