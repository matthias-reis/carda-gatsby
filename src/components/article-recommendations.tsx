import * as React from 'react';
import styled from '@emotion/styled';

import { color } from '../style';
import { CompactArticle } from '../types';

import { Container } from './container';
import { ArticleList } from './article-list';

const Section = styled.nav`
  background: ${color.cold[2]};
`;

export const ArticleRecommendations: React.FC<{
  recommendations: CompactArticle[];
}> = ({ recommendations }) => {
  return (
    <Section>
      <Container large>
        <h2>Interessante Beiträge</h2>
        <ArticleList
          maxArticles={4}
          articles={recommendations}
          content="recommendations"
        />
      </Container>
    </Section>
  );
};
