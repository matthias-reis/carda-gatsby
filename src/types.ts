import { FluidObject } from 'gatsby-image';

export type ArticleImage = {
  childImageSharp: { fluid: FluidObject };
};

export type Fields = {
  labels: string[];
  path: string;
  type: 'page' | 'article' | 'wordpress';
  recommendations: Recommendation[];
};

export type Frontmatter = {
  title: string;
  subTitle: string;
  seoTitle?: string;
  ogTitle?: string;
  date: string | Date;
  type: string;
  typeName: string;
  description: string;
  excerpt?: string;
  focusKeyword?: string;
  image?: ArticleImage;
  remoteImage?: string;
  remoteLoadingImage?: string;
  remoteThumbnailImage?: string;
  ogImage?: string;
  language?: 'en' | 'de';
  languageLink?: string;
  advertisement?: boolean;
  affiliate?: boolean;
};

export type Article = {
  id?: string;
  body?: string;
  timeToRead?: string;
  fields: Fields;
  frontmatter: Frontmatter;
};

export type DetailArticle = { id?: string; body?: string } & Fields &
  Frontmatter;

export type CompactArticle = Pick<
  DetailArticle,
  | 'typeName'
  | 'title'
  | 'subTitle'
  | 'description'
  | 'image'
  | 'remoteLoadingImage'
  | 'remoteThumbnailImage'
  | 'language'
  | 'languageLink'
  | 'path'
  | 'date'
>;

export type ListQuery = {
  allMdx: {
    edges: ListQueryNode[];
  };
  allCategoriesYaml: {
    edges: CategoryNode[];
  };
};

export type ListQueryNode = {
  node: Article;
};

export type CategoryNode = {
  node: Category;
};
export type Category = {
  slug?: string;
  title?: string;
  description?: string;
  parentId?: string;
  id?: string;
  children?: Record<string, Category>;
  parent?: Category;
};

export type Labels = { [label: string]: Article[] };

export type Recommendation = {
  vote: number;
  article?: Article;
  articleId: string;
};
