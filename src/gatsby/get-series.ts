import { toCompactArticle } from '../to-compact-article';
import type { Article, Labels, CompactArticle } from '../types';

export const getSeries = (article: Article, labels: Labels) => {
  const seriesLabels =
    article.fields.labels?.filter((label) => label.type === 'serie:') ?? [];

  const series: Record<string, CompactArticle[]> = seriesLabels.reduce(
    (ret: Record<string, CompactArticle[]>, seriesLabel) => {
      ret[seriesLabel.title] = labels[seriesLabel.slug]
        .map(toCompactArticle)
        .filter((article: CompactArticle) => article.language !== 'en');
      return ret;
    },
    {}
  );

  return series;
};
