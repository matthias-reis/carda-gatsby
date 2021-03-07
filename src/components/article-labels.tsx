import * as React from 'react';
import styled from '@emotion/styled';

import { color } from '../style';
import { Article, CompactArticle } from '../types';

import { Container } from './container';
import { ArticleList } from './article-list';
import { LabelList } from './label-list';

const Section = styled.nav`
  background: ${color.cold[2]};
`;

export const ArticleLabels: React.FC<{
  labels: string[];
}> = ({ labels }) => {
  if (labels) {
    return (
      <Section>
        <Container large>
          <h2>Kategorien & Stichworte</h2>
          <LabelList labels={labels} />
        </Container>
      </Section>
    );
  }
};
