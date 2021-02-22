import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import UnstyledImage from 'gatsby-image';
import moment from 'moment';
import 'moment/locale/de';

import type { CompactArticle } from '../types';
import { color, space, fontSize } from '../style';

import { CompactTitle, CompactSubtitle, P, S } from './typo';
import { CardaImage } from './carda-image';
import { event } from './analytics';

moment.locale('de');

export const ArticleList: React.FC<{
  articles: CompactArticle[];
  maxArticles?: number;
  content: string;
}> = ({ articles, maxArticles, content }) => {
  if (maxArticles) {
    articles = articles.slice(0, maxArticles);
  }

  return (
    <List>
      {articles.map((article, i) => {
        return (
          <Item key={article.path}>
            <ItemLink
              to={article.path}
              onClick={() =>
                event(`list/${content}/clicked`, 'list', content, `$(i + 1)`)
              }
            >
              <Date>{moment(article.date).fromNow()}</Date>
              <ImageContainer>
                {article.image?.childImageSharp && (
                  <Image
                    Tag="div"
                    alt={article.title}
                    fluid={article.image!.childImageSharp.fluid}
                  />
                )}
                {(article.remoteLoadingImage ?? null) && (
                  <CardaImage
                    alt={article.title}
                    src={article.remoteThumbnailImage || ''}
                    loading={article.remoteLoadingImage || ''}
                  />
                )}
              </ImageContainer>
              <Text>
                <CompactTitle>{article.title}</CompactTitle>
                <CompactSubtitle>{article.subTitle}</CompactSubtitle>
                <S>{article.description}</S>
              </Text>
            </ItemLink>
          </Item>
        );
      })}
    </List>
  );
};

const ImageContainer = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 75%;
  overflow: hidden;
  position: relative;
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: ${space[3]};
  align-items: stretch;
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  align-items: stretch;
`;

const ItemLink = styled(Link)`
  display: block;
  width: 100%;
  border: 1px solid ${color.border[0]};
  background: #fff8;
  border-radius: ${space[0]};
  position: relative;
  color: ${color.neutral[1]};
  text-decoration: none;
`;

const Text = styled.div`
  padding: ${space[1]};
`;

const Date = styled.div`
  position: absolute;
  z-index: 1;
  top: -${space[1]};
  right: ${space[1]};
  border: 1px solid ${color.border[0]};
  background: #fff;
  padding: 0 ${space[1]};
  border-radius: 4px;
  font-size: ${fontSize[1]};
`;

const Image = styled(UnstyledImage)`
  border-radius: 4px 4px 0 0;
`;
