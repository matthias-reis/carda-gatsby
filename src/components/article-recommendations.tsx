import * as React from 'react';
import styled from '@emotion/styled';

import { color } from '../style';
import { CompactArticle } from '../types';

import { Container } from './container';
import { H3 } from './typo';
import { ArticleList } from './article-list';

const Section = styled.nav`
  background: ${color.background20};
`;

export const ArticleRecommendations: React.FC<{
  recommendations: CompactArticle[];
}> = ({ recommendations }) => {
  return (
    <Section>
      <Container large>
        <H3>Interessante Beiträge</H3>
        <ArticleList
          maxArticles={4}
          articles={recommendations}
          content="recommendations"
        />
      </Container>
    </Section>
  );
};
