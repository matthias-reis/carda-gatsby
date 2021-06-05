import { Article, CompactArticle } from './types';

type ToCompactArticleFn = (article: Article) => CompactArticle;

const fixSoftHyphens = (s?: string) =>
  (s || '').replace(/&shy;/g, String.fromCharCode(173));

export const toCompactArticle: ToCompactArticleFn = ({
  frontmatter,
  fields,
}) => {
  return {
    title: fixSoftHyphens(frontmatter.title),
    typeName: frontmatter.typeName || frontmatter.type || 'Beitrag',
    subTitle: fixSoftHyphens(frontmatter.subTitle),
    description: frontmatter.description,
    excerpt: fixSoftHyphens(frontmatter.excerpt || ''),
    image: frontmatter.image,
    remoteLoadingImage: frontmatter.remoteLoadingImage,
    remoteThumbnailImage: frontmatter.remoteThumbnailImage,
    path: fields.path,
    date: frontmatter.date,
    language: frontmatter.language || 'de',
    languageLink: frontmatter.languageLink,
    advertisement: frontmatter.advertisement,
    affiliate: frontmatter.affiliate,
  };
};
