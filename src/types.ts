import { FluidObject } from "gatsby-image";

export type CompactArticle = {
  title: string;
  subTitle: string;
  description: string;
  path: string;
  date: {
    fromNow: string;
  };
};

type Recommendation = {
  article: CompactArticle;
  vote: number;
};

type Fields = {
  label: string;
  path: string;
  recommendations: Recommendation[];
};

type Frontmatter = {
  title: string;
  subTitle: string;
  description: string;
  image: { childImageSharp: { fluid: FluidObject } };
  labels: string[];
};

export type RawArticle = {
  body: string;
  fields: Fields;
  frontmatter: Frontmatter;
};

export type Article = Fields & Frontmatter;
