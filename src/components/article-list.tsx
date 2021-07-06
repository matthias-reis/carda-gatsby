import React, { PureComponent } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import moment from 'moment';
import 'moment/locale/de';

import type { CompactArticle } from '../types';
import { space } from '../style';

import { ArticleListGridItem } from './article-list-grid-item';
import { ArticleListHorizontalItem } from './article-list-horizontal-item';

moment.locale('de');

export const ArticleList: React.FC<{
  articles: CompactArticle[];
  maxArticles?: number;
  content: string;
  type?: 'grid' | 'horizontal';
}> = ({ articles, maxArticles, content, type = 'grid' }) => {
  if (maxArticles) {
    articles = articles.slice(0, maxArticles);
  }

  return (
    <List type={type}>
      {articles.map((article, i) => {
        const Comp =
          type === 'grid' ? ArticleListGridItem : ArticleListHorizontalItem;
        return <Comp article={article} content={content} key={i} />;
      })}
    </List>
  );
};

const List = styled.ul<{ type: 'grid' | 'horizontal' }>`
  ${({ type }) =>
    type === 'grid' &&
    `display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: ${space[3]};
  align-items: stretch;`}
  list-style: none;
  padding: 0;
`;
