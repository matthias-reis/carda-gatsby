import React from "react";
import styled from "@emotion/styled";
import Image from "gatsby-image";

import { Link } from "./link";
import { Interactions } from "./interactions";
import { Title, Subtitle } from "./typo";
import { HR } from "./hr";
import { Container } from "./container";
import { ArticleCrossLinkSection } from "./article-crosslink-section";
import { FooterNavigation } from "./footer-navigation";
import { InteractionDetails } from "./interaction-details";

import { getPath } from "../gatsby/slugify";
import { space, color } from "../style";
import { Article as ArticleMeta, RawArticle } from "../types";

const ArticleFooter = styled.div`
  margin-top: ${space[4]};
`;

const ImageContainer = styled.div`
  margin-top: ${space[2]};
  margin-bottom: ${space[3]};
`;

const Label = styled(Link)`
  display: inline-block;
  border: 1px solid blue;
  border-radius: 3px;
  padding: 0 4px;
  margin: 0 4px 4px 0;
  color: black;
  text-decoration: none;
`;

const Meta = styled.p`
  margin: 0 0 ${space[2]} 0;
  color: ${color.neutral[3]};
  text-align: center;
`;

const CurrentLink = styled.a`
  color: ${color.cold[0]};
`;

const ArticleContainer = Container.withComponent("article");

const zeroPad = (val: string | number, digits: number) =>
  `${Array(digits).fill(0).join()}${val}`.slice(-digits);

const getType = (meta: ArticleMeta) => {
  let ret = "Beitrag";
  if (meta.type && meta.type !== "Artikel" && meta.type !== "Standard") {
    ret = meta.type;
  }
  if (meta.typeName) {
    ret = meta.typeName;
  }
  return ret;
};

export const ArticlePage: React.FC<ArticleProps> = ({
  children,
  meta,
  recommendations,
}) => {
  const date = new Date(meta.date);
  const formattedDate = `${zeroPad(date.getDate(), 2)}.${zeroPad(
    date.getMonth() + 1,
    2
  )}.${date.getFullYear()}`;
  return (
    <div>
      <ArticleContainer>
        <Interactions meta={meta} />
        <Meta>
          {getType(meta)} vom {formattedDate} ·{" "}
          <CurrentLink href={`https://cardamonchai.com${meta.path}`}>
            im alten Blog
          </CurrentLink>
        </Meta>
        <HR />
        <Title>{meta.title}</Title>
        {meta.subTitle && <Subtitle>{meta.subTitle}</Subtitle>}
        <ImageContainer>
          {meta.image && <Image fluid={meta.image.childImageSharp.fluid} />}
        </ImageContainer>
        <div>{children}</div>
      </ArticleContainer>
      <ArticleFooter>
        <InteractionDetails meta={meta} />
        <ArticleCrossLinkSection
          meta={meta}
          recommendations={recommendations}
        />
        <FooterNavigation />
      </ArticleFooter>
    </div>
  );
};

type ArticleProps = {
  meta: ArticleMeta;
  recommendations: RawArticle[];
};
