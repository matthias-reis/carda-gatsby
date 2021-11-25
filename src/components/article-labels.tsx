import * as React from 'react';
import styled from '@emotion/styled';

import { color } from '../style';

import { Container } from './container';
import { H3 } from './typo';
import { LabelList } from './label-list';

const Section = styled.nav`
  background: ${color.background30};
`;

export const ArticleLabels: React.FC<{
  labels: { title: string; slug: string; type: string; count: number }[];
}> = ({ labels = [] }) => {
  const relevantLabels = labels.filter((label) => label.count > 1);
  if (relevantLabels) {
    return (
      <Section>
        <Container large>
          <H3>Kategorien & Stichworte</H3>
          <LabelList labels={relevantLabels} />
        </Container>
      </Section>
    );
  }
};
