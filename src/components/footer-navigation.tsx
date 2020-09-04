import * as React from "react";
import styled from "@emotion/styled";
import { Container } from "./container";
import { color, space, font } from "../style";

const Section = styled.footer`
  background: ${color.neutral[2]};
`;

const Copyright = styled.p`
  color: ${color.neutral[3]};
  text-align: center;
`;

const Navigation = styled.nav`
  text-align: center;
  margin-bottom: ${space[3]};
`;

const Item = styled.a`
  display: inline-block;
  padding: 0 ${space[1]};
  text-decoration: none;
  color: ${color.cold[2]};
  font-family: ${font.title};

  &:hover,
  &:focus {
    color: ${color.neutral[5]};
    background: ${color.cold[0]};
    border-radius: ${space[1]};
  }
`;

export const FooterNavigation: React.FC = () => (
  <Section>
    <Container large>
      <Copyright>
        © {new Date().getFullYear()} · Cardamonchai.com · Rock'n'Roll Vegan.
      </Copyright>
      <Navigation>
        <Item href="/archive">Archiv</Item>
        <Item href="/labels">Themen</Item>
        <Item href="/">für Affiliates</Item>
        <Item href="/">Impressum</Item>
        <Item href="/">Datenschutz</Item>
        <Item href="/">Transparenz</Item>
      </Navigation>
    </Container>
  </Section>
);
