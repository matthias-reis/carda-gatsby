import * as React from 'react';
import styled from '@emotion/styled';
import { Container } from './container';
import { color } from '../style';

const Section = styled.footer`
  background: ${color.neutral[2]};
`;

export const FooterNavigation: React.FC = () => (
  <Section>
    <Container large>
      <p>© {new Date().getFullYear()} Anne bloggt cardamonchai.</p>
      <ul>
        <li>
          <a href="/archive">Archiv</a>
          <a href="/">für Affiliates</a>
          <a href="/">Impressum</a>
          <a href="/">Datenschutz</a>
          <a href="/">Transparenz</a>
        </li>
      </ul>
    </Container>
  </Section>
);
