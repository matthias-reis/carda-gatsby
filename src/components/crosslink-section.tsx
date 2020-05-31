import * as React from 'react';
import styled from '@emotion/styled';
import { Container } from './container';
import { color } from '../style';
import { Article } from '../types';

const Section = styled.nav`
  background: ${color.neutral[5]};
`;

export const CrossLinkSection: React.FC<{ meta: Article }> = ({ meta }) => (
  <Section>
    <Container large>
      <h2>Interessante Beiträge</h2>
      <ul>
        <li>
          <a href="/">
            <h3>Title</h3>
            <h3>Subtitle</h3>
          </a>
        </li>
        <li>
          <a href="/">
            <h3>Title</h3>
            <h3>Subtitle</h3>
          </a>
        </li>
        <li>
          <a href="/">
            <h3>Title</h3>
            <h3>Subtitle</h3>
          </a>
        </li>
        <li>
          <a href="/">
            <h3>Title</h3>
            <h3>Subtitle</h3>
          </a>
        </li>
      </ul>
      <h2>Getaggt mit</h2>
      <ul>
        <li>
          <a href="/">Tag 1</a>
        </li>
        <li>
          <a href="/">Tag 2</a>
        </li>
        <li>
          <a href="/">Tag 3</a>
        </li>
        <li>
          <a href="/">Tag 4</a>
        </li>
      </ul>
    </Container>
  </Section>
);
