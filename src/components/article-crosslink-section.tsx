import * as React from "react";
import styled from "@emotion/styled";

import { color, space } from "../style";
import { Article } from "../types";

import { Container } from "./container";
import { ArticleList } from "./article-list";

const Section = styled.nav`
  background: ${color.cold[2]};
`;

export const ArticleCrossLinkSection: React.FC<{ meta: Article }> = ({
  meta,
}) => {
  const recos = meta.recommendations;
  return (
    <Section>
      <Container large>
        <h2>Interessante Beiträge</h2>
        <ArticleList articles={recos.map((a) => a.article)} />
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
};
