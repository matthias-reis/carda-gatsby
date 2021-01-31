import type { Article, Labels, Recommendation } from '../types';

export const recommend = (article: Article, labels: Labels) => {
  const recommendations: {
    [path: string]: Recommendation;
  } = {};
  for (const label of article.fields.labels || []) {
    const articlesWithSameLabel = (labels[label] || []).filter(
      (a) => a.frontmatter.title !== article.frontmatter.title
    );
    for (const a of articlesWithSameLabel) {
      if (!recommendations[a.fields.path]) {
        recommendations[a.fields.path] = {
          article: a,
          articleId: a.id!,
          vote: 1,
        };
      } else {
        recommendations[a.fields.path].vote++;
      }
    }
  }
  const ret = Object.values(recommendations).map((a) => {
    const timePenalty =
      (new Date(article.frontmatter.date).getTime() -
        new Date(a.article!.frontmatter.date).getTime()) /
      (1000 * 60 * 60 * 24 * 365);
    const agePenalty =
      (Date.now() - new Date(a.article!.frontmatter.date).getTime()) /
      (1000 * 60 * 60 * 24 * 365 * 3); // less weight (3 years = 1 label)
    a.vote = a.vote - timePenalty - agePenalty;

    return a;
  });

  return ret
    .sort((a, b) => b.vote - a.vote)
    .slice(0, 5)
    .map((a) => {
      delete a.article;
      return a;
    });
};
