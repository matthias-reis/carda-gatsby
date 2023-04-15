import * as React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { Container } from './container';
import { color, space, font } from '../style';
import { event } from './analytics';
import { TreeNation } from './tree-nation';

export const FooterNavigation: React.FC = () => (
  <Section>
    <Container large>
      <Navigation>
        <Item
          to="/das-ist-sounds-vegan"
          onClick={() => event('link/click', 'link', 'footer/about')}
        >
          Über mich
        </Item>
        <Item
          to="/mein-mediakit"
          onClick={() => event('link/click', 'link', 'footer/mediakit')}
        >
          Mediakit
        </Item>
        <Item
          to="/transparenz"
          onClick={() => event('link/click', 'link', 'footer/transparency')}
        >
          Transparenz
        </Item>
        <Item
          to="/datenschutz"
          onClick={() => event('link/click', 'link', 'footer/privacy')}
        >
          Datenschutz
        </Item>
        <Item
          to="/impressum"
          onClick={() => event('link/click', 'link', 'footer/imprint')}
        >
          Impressum
        </Item>
      </Navigation>
      <Copyright>
        © {new Date().getFullYear()} · soundsvegan.com · Anne Reis.
      </Copyright>
      <TreeNation />
    </Container>
  </Section>
);

const Section = styled.footer`
  background: ${color.background20};
`;

const Copyright = styled.p`
  color: ${color.text30};
  text-align: center;
  margin-bottom: ${space[3]};
`;

const Navigation = styled.nav`
  margin-top: ${space[2]};
  text-align: center;
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
