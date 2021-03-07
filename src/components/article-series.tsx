import * as React from 'react';
import styled from '@emotion/styled';

import { color } from '../style';
import { CompactArticle } from '../types';

import { Container } from './container';
import { ArticleList } from './article-list';

const Section = styled.nav`
  background: #fff;
`;

export const ArticleSeries: React.FC<{
  series: Record<string, CompactArticle[]>;
}> = ({ series }) => {
  console.log(series);
  if (Object.entries(series).length > 0) {
    return (
      <Section>
        <Container>
          {Object.entries(series).map(([name, articles]) => (
            <div key={name}>
              <h3>
                <N>Dieser Beitrag ist Teil der Serie</N> "{name}"
              </h3>
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
  }
};

const N = styled.span`
  font-weight: normal;
`;
