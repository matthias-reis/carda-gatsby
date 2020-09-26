import * as React from "react";
import styled from "@emotion/styled";

import { CompactArticle } from "../types";
import { space } from "../style";

import { Title, Subtitle } from "./typo";
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
`;

const ListPage: React.FC<{ articles: CompactArticle[]; title: string }> = ({
  articles,
  title,
}) => {
  return (
    <div>
      <ContentSection>
        <Hd>
          <Title>
            «Thema: <strong>{title}</strong>»
          </Title>
          <Subtitle>{articles.length} Artikel</Subtitle>
        </Hd>
        <ArticleList articles={articles} />
      </ContentSection>
      <FooterNavigation />
    </div>
  );
};

export default ListPage;
