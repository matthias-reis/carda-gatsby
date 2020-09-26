import * as React from "react";
import styled from "@emotion/styled";

import { color, space } from "../style";
import { Article, RawArticle, CompactArticle } from "../types";

import { Container } from "./container";
import { ArticleList } from "./article-list";
import { LabelList } from "./label-list";

const Section = styled.nav`
  background: ${color.cold[2]};
`;

export const ArticleCrossLinkSection: React.FC<{
  meta: Article;
  recommendations: RawArticle[];
}> = ({ meta, recommendations }) => {
  const recommendedArticles: CompactArticle[] = recommendations.map((r) => ({
    title: r.frontmatter.title,
    subTitle: r.frontmatter.subTitle,
    description: r.frontmatter.description,
    image: r.frontmatter.image,
    date: r.frontmatter.date,
    path: r.fields.path,
  }));
  return (
    <Section>
      <Container large>
        <h2>Interessante Beiträge</h2>
        <ArticleList maxArticles={4} articles={recommendedArticles} />
        <h2>Themen</h2>
        {meta.labels && <LabelList labels={meta.labels} />}
      </Container>
    </Section>
  );
};
