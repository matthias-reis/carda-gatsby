import { FluidObject } from "gatsby-image";

export type ArticleImage = {
  absolutePath?: string;
  childImageSharp: { fluid: FluidObject };
};

export type CompactArticle = {
  title: string;
  subTitle: string;
  description: string;
  image: ArticleImage;
  path: string;
  date: string | Date;
};

export type Recommendation = {
  article: CompactArticle;
  vote: number;
};

export type Fields = {
  label: string;
  path: string;
  recommendations: Recommendation[];
};

export type Frontmatter = {
  title: string;
  subTitle: string;
  date: string | Date;
  type: string;
  typeName: string;
  description: string;
  image: ArticleImage;
  labels: string[];
};

export type RawArticle = {
  body: string;
  fields: Fields;
  frontmatter: Frontmatter;
};

export type Article = Fields & Frontmatter;

export type ListQuery = {
  allMdx: {
    edges: ListQueryNode[];
  };
};

export type ListQueryNode = {
  node: RawArticle;
};
