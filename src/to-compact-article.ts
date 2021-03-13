import { Article, CompactArticle } from './types';

type ToCompactArticleFn = (article: Article) => CompactArticle;

export const toCompactArticle: ToCompactArticleFn = ({
  frontmatter,
  fields,
}) => {
  return {
    title: frontmatter.title,
    typeName: frontmatter.typeName || frontmatter.type || 'Beitrag',
    subTitle: frontmatter.subTitle,
    description: frontmatter.description,
    image: frontmatter.image,
    remoteLoadingImage: frontmatter.remoteLoadingImage,
    remoteThumbnailImage: frontmatter.remoteThumbnailImage,
    path: fields.path,
    date: frontmatter.date,
    language: frontmatter.language,
    links: frontmatter.links,
  };
};
