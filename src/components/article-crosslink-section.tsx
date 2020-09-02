import * as React from "react";
import styled from "@emotion/styled";

import { color, space } from "../style";
import { Article } from "../types";

import { Container } from "./container";
import { ArticleList } from "./article-list";
import { LabelList } from "./label-list";

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
        <h2>Themen</h2>
        {meta.labels && <LabelList labels={meta.labels} />}
      </Container>
    </Section>
  );
};
