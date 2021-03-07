import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import UnstyledImage from 'gatsby-image';
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
  const hasEnglishVersion = !!(article.links?.en ?? false);
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
        {hasEnglishVersion && (
          <LanguageHint>🇬🇧 English version available</LanguageHint>
        )}
      </Content>
    </Box>
  );
};

const LanguageHint = styled.div`
  font-size: ${fontSize[1]};
  margin-top: ${space[1]};
`;

const Box = styled(Link)`
  border-bottom: 1px solid ${color.border[1]};
  display: flex;
  width: ${width[4]};
  max-width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  padding: ${space[1]} 0;
  text-decoration: none;
  font-size: ${fontSize[2]};
`;

const ImageContainer = styled.span`
  width: 100px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-right: ${space[1]};
`;

const Image = styled.img`
  width: 150px;
  flex: 0 0 auto;
`;

const Content = styled.span`
  flex: 1 1 auto;
  color: ${color.neutral[1]};
  text-decoration: none;
`;

const Title = styled.span`
  display: block;
  font-weight: bold;
`;
const SubTitle = styled.span`
  display: block;
`;
