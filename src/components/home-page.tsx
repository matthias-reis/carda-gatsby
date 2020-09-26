import * as React from "react";
import styled from "@emotion/styled";

import { CompactArticle } from "../types";
import { space } from "../style";

import { HomeLogo } from "./home-logo";
import { ArticleList } from "./article-list";
import { FooterNavigation } from "./footer-navigation";

const ContentSection = styled.div`
  margin: 0 ${space[4]};
  @media (max-width: 899px) {
    margin: 0 ${space[1]};
  }
`;

const Hd = styled.div`
  margin: ${space[4]} 0;
  text-align: center;
`;

export const HomePage: React.FC<{
  articles: CompactArticle[];
}> = ({ articles }) => {
  return (
    <div>
      <ContentSection>
        <Hd>
          <HomeLogo />
        </Hd>
        <ArticleList articles={articles.slice(0, 3)} />
      </ContentSection>
      <h1>Splitter</h1>
      <FooterNavigation />
      <ContentSection>
        <ArticleList articles={articles.slice(3)} />
      </ContentSection>
    </div>
  );
};
