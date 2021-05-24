import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import moment from 'moment';
import 'moment/locale/de';

import type { CompactArticle } from '../types';
import { color, space, fontSize, width } from '../style';

import { event } from './analytics';

moment.locale('de');

export const ArticleListHorizontalItem: React.FC<{
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

  return (
    <Box
      to={article.path}
      onClick={() =>
        event(`list/${content}/clicked`, 'list', content, `$(i + 1)`)
      }
    >
      <ImageContainer>
        <Image
          src={
            article.remoteThumbnailImage ||
            article.image?.childImageSharp?.fluid?.src
          }
        />
      </ImageContainer>
      <Content>
        <Title>{article.title}</Title>
        <SubTitle>{article.subTitle}</SubTitle>
        {article.languageLink && (
          <LanguageHint>🇬🇧 English version available</LanguageHint>
        )}
        {isAdOrAffiliate && <MetaTeaser>{adTeaser}</MetaTeaser>}
      </Content>
    </Box>
  );
};

const LanguageHint = styled.div`
  font-size: ${fontSize[1]};
  margin-top: ${space[1]};
`;

const Content = styled.span`
  flex: 1 1 auto;
  color: ${color.text30};
  text-decoration: none;
`;

const Title = styled.span`
  color: ${color.text20};
  display: block;
  font-weight: bold;
`;
const SubTitle = styled.span`
  display: block;
`;
const Box = styled(Link)`
  display: flex;
  width: ${width[4]};
  max-width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  padding: ${space[1]} 0;
  text-decoration: none;
  font-size: ${fontSize[2]};
  border-bottom: 1px solid ${color.border20};
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: ${color.overlay10};

    ${Title} {
      color: ${color.text10};
    }
    ${SubTitle} {
      color: ${color.text20};
    }
  }
`;

const ImageContainer = styled.span`
  width: 120px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-right: ${space[1]};
`;

const Image = styled.img`
  width: 120px;
  flex: 0 0 auto;
`;

const MetaTeaser = styled.div`
  text-align: right;
  font-size: ${fontSize[2]};
  color: ${color.text30};
  padding: ${space[0]};
`;
