import * as React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { Container } from './container';
import { color, space, font } from '../style';
import { event } from './analytics';

export const FooterNavigation: React.FC = () => (
  <Section>
    <Container large>
      <Copyright>
        © {new Date().getFullYear()} · Cardamonchai.com · Rock'n'Roll Vegan.
      </Copyright>
      <Navigation>
        <Item
          to="/archive"
          onClick={() => event('link/click', 'link', 'footer/archive')}
        >
          Archiv
        </Item>
        <Item
          to="/labels"
          onClick={() => event('link/click', 'link', 'footer/tags')}
        >
          Themen
        </Item>
        <Item
          to="/affiliates"
          onClick={() => event('link/click', 'link', 'footer/affiliates')}
        >
          für Affiliates
        </Item>
        <Item
          to="/impressum"
          onClick={() => event('link/click', 'link', 'footer/imprint')}
        >
          Impressum
        </Item>
        <Item
          to="/datenschutz"
          onClick={() => event('link/click', 'link', 'footer/privacy')}
        >
          Datenschutz
        </Item>
        <Item
          to="/transparenz"
          onClick={() => event('link/click', 'link', 'footer/transparency')}
        >
          Transparenz
        </Item>
      </Navigation>
    </Container>
  </Section>
);

const Section = styled.footer`
  background: ${color.background20};
`;

const Copyright = styled.p`
  color: ${color.neutral[3]};
  text-align: center;
`;

const Navigation = styled.nav`
  text-align: center;
  margin-bottom: ${space[3]};
`;

const Item = styled(Link)`
  display: inline-block;
  padding: 0 ${space[1]};
  text-decoration: none;
  color: ${color.green50};
  font-family: ${font.title};

  &:hover,
  &:focus {
    text-decoration: underline;
    color: ${color.text10};
    background: ${color.green20};
    border-radius: ${space[1]};
  }
`;
