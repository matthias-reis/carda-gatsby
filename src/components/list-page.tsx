import * as React from 'react';
import styled from '@emotion/styled';

import { CompactArticle } from '../types';
import { space } from '../style';

import { Title, Subtitle } from './typo';
import { ArticleList } from './article-list';
import { PageMeta } from './page-meta';
import { slugify } from '../gatsby/slugify';

const ContentSection = styled.div`
  margin: 0 ${space[4]};
  @media (max-width: 899px) {
    margin: 0 ${space[1]};
  }
`;

const Hd = styled.div`
  margin: ${space[4]} 0;
`;

const ListPage: React.FC<{
  articles: CompactArticle[];
  topic: string;
  title: string;
  path: string;
}> = ({ articles, topic, title, path }) => {
  return (
    <div>
      <PageMeta title={`${topic}${title}`} path={path} />
      <ContentSection>
        <Hd>
          <Title>
            {topic} «<strong>{title}</strong>»
          </Title>
          <Subtitle>{articles.length} Artikel</Subtitle>
        </Hd>
        <ArticleList articles={articles} content={`list/${topic}`} />
      </ContentSection>
    </div>
  );
};

export default ListPage;
