import * as React from 'react';
import styled from '@emotion/styled';

import { color, space } from '../style';
import { Article, RawArticle, CompactArticle } from '../types';

import { Container } from './container';
import { ArticleList } from './article-list';
import { LabelList } from './label-list';

const Section = styled.nav`
  background: ${color.cold[2]};
`;

export const ArticleCrossLinkSection: React.FC<{
  meta: Article;
  recommendations: CompactArticle[];
}> = ({ meta, recommendations }) => {
  return (
    <Section>
      <Container large>
        <h2>Interessante Beiträge</h2>
        <ArticleList maxArticles={4} articles={recommendations} />
        <h2>Themen</h2>
        {meta.frontmatter.labels && (
          <LabelList labels={meta.frontmatter.labels} />
        )}
      </Container>
    </Section>
  );
};
