import * as React from 'react';
import styled from '@emotion/styled';

import { color } from '../style';

import { Container } from './container';
import { H3 } from './typo';
import { LabelList } from './label-list';

const Section = styled.nav`
  background: ${color.background20};
`;

export const ArticleLabels: React.FC<{
  labels: string[];
}> = ({ labels }) => {
  if (labels) {
    return (
      <Section>
        <Container large>
          <H3>Kategorien & Stichworte</H3>
          <LabelList labels={labels} />
        </Container>
      </Section>
    );
  }
};
