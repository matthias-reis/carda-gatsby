import React from 'react';
import styled from '@emotion/styled';
import Image from 'gatsby-image';
import { Link as GatsbyLink } from 'gatsby';

import { Link } from './link';
import { Interactions } from './interactions';
import { Title, Subtitle } from './typo';
import { Container } from './container';
import { ArticleSeries } from './article-series';
import { ArticleLabels } from './article-labels';
import { ArticleRecommendations } from './article-recommendations';
import { FooterNavigation } from './footer-navigation';
import { AdminBar } from './admin-bar';

import { space, color, fontSize } from '../style';
import { Article as ArticleMeta, CompactArticle } from '../types';
import { CardaImage } from './carda-image';
import { PageMeta } from './page-meta';
import { HR } from './hr';

import iconUrl from '../assets/signature-icon.jpg';

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

const fixSoftHyphens = (s?: string) =>
  (s || '').replace(/&shy;/g, String.fromCharCode(173));

export const ArticlePage: React.FC<ArticleProps> = ({
  children,
  meta,
  recommendations,
  series,
  path,
}) => {
  const file = meta.fileAbsolutePath || '';
  const date = new Date(meta.frontmatter.date);
  const isInFuture = date.getTime() - new Date().getTime() > 0;
  const isOldArticle = file.indexOf('content/wordpress/articles/') > -1;
  const adminPath = isOldArticle
    ? file.split('content/wordpress/articles/')[1].replace('.md', '')
    : file.split('content/articles/')[1].replace('.md', '');

  const isAd = meta.frontmatter.advertisement;
  const isAffiliate = meta.frontmatter.affiliate;
  const isAdOrAffiliate = isAd || isAffiliate;

  let adTeaser = '';
  if (isAd) {
    adTeaser = 'Werbung';
  }
  if (isAffiliate) {
    adTeaser = 'Affiliate-Links';
  }
  if (isAd && isAffiliate) {
    adTeaser = 'Werbung & Affiliate-Links';
  }

  const formattedDate = `${zeroPad(date.getDate(), 2)}.${zeroPad(
    date.getMonth() + 1,
    2
  )}.${date.getFullYear()}`;
  return (
    <div>
      <PageMeta meta={meta} path={path} />
      <Interactions meta={meta} />
      <ArticleContainer>
        <Title>{fixSoftHyphens(meta.frontmatter.title)}</Title>
        {meta.frontmatter.subTitle && (
          <Subtitle>{fixSoftHyphens(meta.frontmatter.subTitle)}</Subtitle>
        )}
        {isAdOrAffiliate && (
          <AdAndAffiliateTeaser href="#werbung-affiliate">
            {adTeaser} *
          </AdAndAffiliateTeaser>
        )}
        <MetaArea>
          <Icon src={iconUrl} />
          <Meta>
            <div>{getType(meta)} von Anne</div>
            <div>
              {formattedDate} &mdash; Lesezeit: {meta.timeToRead} min
            </div>
          </Meta>
          {meta.frontmatter.languageLink && meta.frontmatter.language === 'en' && (
            <LanguageArea>
              <Language to={meta.frontmatter.languageLink}>
                Deutsche&nbsp;Version&nbsp;lesen
              </Language>
            </LanguageArea>
          )}
          {meta.frontmatter.languageLink && meta.frontmatter.language === 'de' && (
            <LanguageArea>
              <Language to={meta.frontmatter.languageLink}>
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
              alt={fixSoftHyphens(meta.frontmatter.title)}
            />
          )}
        </ImageContainer>
        <div>{children}</div>
        {isAdOrAffiliate && (
          <>
            <HR />
            <AdAndAffiliateDisclaimer id="werbung-affiliate">
              Dieser Beitrag enthält {adTeaser}.{' '}
              {meta.frontmatter.productsProvided && (
                <span>
                  Die Produkte wurden mir kostenfrei zur Verfügung gestellt.
                </span>
              )}
              Der Inhalt und meine Meinung wurden dadurch nicht beeinflusst.
              Infos zum Thema Werbekennzeichnung in meinem Blog findet Ihr auf
              meiner <Link href="/werbung">Transparenz-Seite</Link>.
            </AdAndAffiliateDisclaimer>
          </>
        )}
      </ArticleContainer>
      <ArticleFooter>
        <ArticleSeries series={series} />
        <ArticleRecommendations recommendations={recommendations} />
        <ArticleLabels labels={meta.fields.labels} />
        {/* <ArticleComments meta={meta} /> */}
        <FooterNavigation />
      </ArticleFooter>
      <AdminBar
        link={adminPath}
        isInFuture={isInFuture}
        isOldArticle={isOldArticle}
      />
    </div>
  );
};

type ArticleProps = {
  meta: ArticleMeta;
  recommendations: CompactArticle[];
  path: string;
  series: Record<string, CompactArticle[]>;
};

const Icon = styled.img`
  height: 75px;
  width: 75px;
  margin-right: ${space[1]};
  flex: 0 0 auto;
`;

const MetaArea = styled.div`
  display: flex;
  flex-wrap: wrap;
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
  margin: 0 auto;
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

const AdAndAffiliateTeaser = styled.a`
  display: block;
  text-align: right;
  font-size: ${fontSize[2]};
  text-decoration: none;
  color: ${color.text30};
`;

const AdAndAffiliateDisclaimer = styled.p`
  display: block;
  font-size: ${fontSize[2]};
  text-decoration: none;
  color: ${color.text30};
`;
