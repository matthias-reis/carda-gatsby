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
      <ArticleContainer>
        <PageMeta title={meta.frontmatter.title} path={path} />
        <Interactions meta={meta} />
        <Meta>
          {getType(meta)} vom {formattedDate}
          {/* &nbsp;·{' '}
          <Link href={`https://cardamonchai.com${meta.fields.path}`}>
            im alten Blog
          </Link> */}
        </Meta>
        <HR />
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
              🇬🇧 Read English Version
            </Language>
          </LanguageArea>
        )}
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
        <ArticleSeries series={series} />
        <ArticleComments meta={meta} />
        <ArticleLabels labels={meta.fields.labels} />
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

const LanguageArea = styled.div`
  display: flex;
  justify-content: center;
`;

const Language = styled(GatsbyLink)`
  text-decoration: none;
  border: 1px solid ${color.neutral[1]};
  height: 24px;
  font-size: ${fontSize[2]};
  padding: 0 ${space[2]};
  margin-top: ${space[2]};
  border-radius: 16px;
  color: ${color.neutral[1]};
`;

const ArticleFooter = styled.div`
  margin-top: ${space[4]};
`;

const ImageContainer = styled.div`
  margin-top: ${space[2]};
  margin-bottom: ${space[3]};
`;

const Meta = styled.p`
  margin: 0 0 ${space[2]} 0;
  color: ${color.neutral[3]};
  text-align: center;
`;

const CurrentLink = styled.a`
  color: ${color.cold[0]};
`;
