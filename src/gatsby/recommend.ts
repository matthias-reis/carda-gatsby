export const recommend = (article: MdxArticle, labels: Labels) => {
  const recommendations: {
    [path: string]: {
      vote: number;
      article: ArticleTeaser;
    };
  } = {};
  for (const label of article.fields.labels || []) {
    const articlesWithSameLabel = (labels[label] || []).filter(
      (a) => a.title !== article.frontmatter.title
    );
    for (const a of articlesWithSameLabel) {
      if (!recommendations[a.path]) {
        recommendations[a.path] = { article: a, vote: 1 };
      } else {
        recommendations[a.path].vote++;
      }
    }
  }
  const ret = Object.values(recommendations).map((a) => {
    const timePenalty =
      (new Date(article.frontmatter.date).getTime() -
        new Date(a.article.date).getTime()) /
      (1000 * 60 * 60 * 24 * 365);
    const agePenalty =
      (Date.now() - new Date(a.article.date).getTime()) /
      (1000 * 60 * 60 * 24 * 365 * 2);
    a.vote = a.vote - timePenalty - agePenalty;

    return a;
  });

  return ret.sort((a, b) => b.vote - a.vote).slice(0, 5);
};

export type ArticleTeaser = {
  path: string;
  date: string;
  title: string;
  subTitle: string;
  description: string;
  image: string;
};

export type Labels = { [label: string]: ArticleTeaser[] };

export type MdxArticle = {
  id: string;
  fields: {
    path: string;
    type: string;
    labels: string[];
  };
  frontmatter: {
    date: string;
    title: string;
    subTitle: string;
    description: string;
    image: string;
  };
};
