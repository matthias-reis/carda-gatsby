import { FluidObject } from 'gatsby-image';

type Fields = {
  label: string;
  path: string;
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
