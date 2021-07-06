import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import moment from 'moment';
import 'moment/locale/de';

import type { CompactArticle } from '../types';
import { color, space, fontSize, font } from '../style';

import { CompactTitle, CompactSubtitle, P, S } from './typo';
import { CardaImage as UnstyledCardaImage } from './carda-image';
import { event } from './analytics';

moment.locale('de');

export const ArticleListGridItem: React.FC<{
  article: CompactArticle;
  content: string;
}> = ({ article, content }) => {
  const isAd = article.advertisement;
  const isAffiliate = article.affiliate;
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

  const hasEnglishVersion = article.language !== 'en' && !!article.languageLink;

  return (
    <Item key={article.path}>
      <ItemLink
        to={article.path}
        onClick={() =>
          event(`list/${content}/clicked`, 'list', content, `$(i + 1)`)
        }
      >
        <Date>{moment(article.date).fromNow()}</Date>
        <Type>{article.typeName || 'Beitrag'}</Type>
        <ImageContainer>
          <InnerImageContainer>
            {article.image?.childImageSharp && (
              <Image
                Tag="div"
                alt={article.title}
                fluid={article.image!.childImageSharp.gatsbyImageData}
              />
            )}
            {(article.remoteLoadingImage ?? null) && (
              <CardaImage
                alt={article.title}
                src={article.remoteThumbnailImage || ''}
                loading={article.remoteLoadingImage || ''}
              />
            )}
          </InnerImageContainer>
        </ImageContainer>
        <Text>
          <CompactTitle>{article.title}</CompactTitle>
          <CompactSubtitle>{article.subTitle}</CompactSubtitle>
          {article.language !== 'en' && !!article.languageLink && (
            <LanguageTeaser>🇬🇧 English version available</LanguageTeaser>
          )}
          <S>{article.excerpt || article.description}</S>
        </Text>
        {isAdOrAffiliate && <MetaTeaser>{adTeaser}</MetaTeaser>}
      </ItemLink>
    </Item>
  );
};

const Type = styled.div`
  text-align: right;
  padding: 0 ${space[1]};
  font-family: ${font.title};
  font-size: ${fontSize[2]};
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 75%;
  overflow: hidden;
  position: relative;
`;

const InnerImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Item = styled.li`
  display: flex;
  align-items: stretch;
`;

const ItemLink = styled(Link)`
  display: flex;
  flex-flow: column;
  width: 100%;
  border: 1px solid ${color.border30};
  background: ${color.overlay10};
  border-radius: ${space[0]};
  position: relative;
  color: ${color.text20};
  text-decoration: none;
  &:hover {
    background: ${color.overlay15};
  }
`;

const Text = styled.div`
  padding: ${space[1]};
  flex: 1 1 auto;
`;

const Date = styled.div`
  position: absolute;
  z-index: 1;
  top: -${space[2]};
  left: ${space[1]};
  border: 1px solid ${color.border30};
  background: ${color.background10};
  padding: ${space[0]} ${space[1]};
  border-radius: 4px;
  font-size: ${fontSize[1]};
`;

const Image = styled(GatsbyImage)`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const CardaImage = styled(UnstyledCardaImage)`
  height: 100%;
  object-fit: cover;
`;

const MetaTeaser = styled.div`
  text-align: right;
  font-size: ${fontSize[2]};
  color: ${color.text30};
  padding: ${space[0]};
  align-self: flex-end;
`;

const LanguageTeaser = styled.div`
  font-size: ${fontSize[2]};
  color: ${color.text30};
  margin-top: -${space[1]};
  margin-bottom: ${space[2]};
`;
