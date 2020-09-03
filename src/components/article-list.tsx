import React from "react";
import styled from "@emotion/styled";
import { Link } from "gatsby";
import * as moment from "moment";
import "moment/locale/de";

import type { CompactArticle } from "../types";
import { color, space, fontSize } from "../style";

import { CompactTitle, CompactSubtitle, P, S } from "./typo";

moment.locale("de");

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: ${space[3]};
  align-items: stretch;
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  align-items: stretch;
`;

const ItemLink = styled(Link)`
  flex: 1 1 auto;
  width: 200px;
  display: block;
  border: 1px solid ${color.border[0]};
  background: #fff8;
  border-radius: ${space[0]};
  padding: ${space[1]};
  position: relative;
  color: ${color.neutral[1]};
  text-decoration: none;
`;

const Date = styled.div`
  position: absolute;
  top: -${space[1]};
  right: ${space[1]};
  border: 1px solid ${color.border[0]};
  background: #fff;
  padding: 0 ${space[1]};
  border-radius: ${space[1]};
  font-size: ${fontSize[1]};
`;

export const ArticleList: React.FC<{ articles: CompactArticle[] }> = ({
  children,
  articles,
}) => {
  return (
    <List>
      {articles.slice(0, 4).map((article) => (
        <Item key={article.path}>
          <ItemLink to={article.path}>
            <Date>{moment(article.date).fromNow()}</Date>
            <CompactTitle>{article.title}</CompactTitle>
            <CompactSubtitle>{article.subTitle}</CompactSubtitle>
            <S>{article.description}</S>
          </ItemLink>
        </Item>
      ))}
    </List>
  );
};
