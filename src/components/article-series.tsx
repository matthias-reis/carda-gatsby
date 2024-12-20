import * as React from 'react';
import styled from '@emotion/styled';

import { color } from '../style';
import { CompactArticle } from '../types';

import { Container } from './container';
import { ArticleList } from './article-list';
import { H3 } from './typo';

const Section = styled.nav`
  background: ${color.background20};
`;

export const ArticleSeries: React.FC<{
  series: Record<string, CompactArticle[]>;
}> = ({ series }) => {
  if (Object.entries(series).length > 0) {
    return (
      <Section>
        <Container>
          {Object.entries(series).map(([name, articles]) => (
            <div key={name}>
              <H3>
                <N>Dieser Beitrag ist Teil der Serie</N> "{name}"
              </H3>
              <ArticleList
                content="series"
                type="horizontal"
                articles={articles}
              />
            </div>
          ))}
        </Container>
      </Section>
    );
  } else {
    return null;
  }
};

const N = styled.span`
  font-weight: normal;
`;
