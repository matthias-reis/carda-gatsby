import { resolve, join } from 'path';
import { getPath } from './slugify';
import { CreatePagesArgs } from 'gatsby';

import { isProduction } from '../is-production';
import { recommend } from './recommend';
import { getSeries } from './get-series';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { Article, CompactArticle, Labels } from '../types';
import { toCompactArticle } from '../to-compact-article';

const paginationBasePath = join(__dirname, '../../public/homepage-data');

const filter = isProduction
  ? `filter: {frontmatter: {date: {lte: "${new Date().toISOString()}"}}},`
  : '';

const ALL_PAGE_QUERY = `
query AllPageQuery {
  allMdx(
    ${filter}
    sort: { fields: frontmatter___date, order: DESC }
  ) {
    edges {
      node {
        id
        fields {
          path
          month
          year
          type
          labels {
            slug
            type
            title
          }
        }
        frontmatter {
          title
          subTitle
          date
          description
          type
          typeName
          remoteLoadingImage
          remoteThumbnailImage
          language
          languageLink
          advertisement
          affiliate
          image
          copyright
          imageCopyright
        }
      }
    }
  }
}
`;

export const createPages = async ({
  actions,
  graphql,
  getNode,
}: CreatePagesArgs) => {
  const { createPage } = actions;

  const { errors, data } = await graphql<AllPageQuery>(ALL_PAGE_QUERY);

  if (errors) {
    errors.forEach((e: Error) => console.error(e.toString()));
    throw new Error(`All page query ended with errors: ${errors.join(', ')}`);
  }

  const edges = data!.allMdx.edges;

  const labels: Labels = {};

  for (const edge of edges) {
    const { fields } = edge.node;
    for (const { slug, title, type } of fields.labels || []) {
      if (!labels[slug]) {
        labels[slug] = { type, title, slug, articles: [] };
      }
      labels[slug].articles.push(edge.node);
    }
  }

  for (const label of Object.values(labels)) {
    const path = getPath(label);

    // ONE PAGE FOR EACH LABEL
    if (path && label.articles.length > 1) {
      const component = resolve(
        __dirname,
        '../components',
        `list-controller.tsx`
      );
      createPage({ path, component, context: { slug: label.slug, label } });
    }
  }

  for (const edge of edges) {
    const article: Article = edge.node;

    const linkableLabels =
      article.fields.labels &&
      article.fields.labels.map((label) => ({
        ...label,
        count: labels[label.slug].articles.length,
      }));

    // fire the recommender engine`
    const recommendations = recommend(article, labels);

    const series = getSeries(article, labels);

    const singleArticlePageComponent = resolve(
      __dirname,
      '../components',
      `article-controller.tsx`
    );
    const singleStaticPageComponent = resolve(
      __dirname,
      '../components',
      `page-controller.tsx`
    );
    // ONE PAGE FOR EACH ARTICLE
    // create a gatsby page for each article / static page
    // including their recommendations
    createPage({
      path: edge.node.fields.path,
      component:
        edge.node.fields.type === 'page'
          ? singleStaticPageComponent
          : singleArticlePageComponent,
      context: {
        id: edge.node.id,
        recommendations: recommendations.map((r) => r.articleId), // recos are now in context and can be used in the query
        series: series,
        linkableLabels,
      },
    });
  }

  // HOME PAGE PAGINATION
  // creating the homepage pagination
  // 30 articles on each additional page
  // first filter static pages
  const articles = edges
    .map((edge) => edge.node)
    .filter((node) => node.fields.type !== 'page')
    .filter((node) => node.frontmatter.language !== 'en')
    // the first 23 articles are displayed already
    // 3 above the fold, 20 below the fold
    // the rest will be loaded in chunks of 50
    .slice(23)
    .map(toCompactArticle);

  //package articles into 50
  const getSliced = (arr: CompactArticle[], n: number): CompactArticle[][] => {
    if (arr.length) {
      return [arr.slice(0, n), ...getSliced(arr.slice(n), n)];
    } else {
      return [];
    }
  };
  const packs = getSliced(articles, 50);

  const allArticlesPageComponent = resolve(
    __dirname,
    '../components',
    `all-articles-controller.tsx`
  );

  packs.forEach((pack, i) => {
    // RAW PAGINATION DATA
    writePackToJson(pack, i + 1, packs.length);

    // PAGINATED FOLLOW UPS OF HOMEPAGE
    createPage({
      path: `/all-articles/${i + 2}`,
      component: allArticlesPageComponent,
      context: {
        pageNumber: i + 2,
        articles: pack,
        maxPageNumber: packs.length + 1,
      },
    });
  });
};

const writePackToJson = (
  articles: CompactArticle[],
  pageNumber: number,
  maxPages: number
) => {
  if (!existsSync(paginationBasePath)) {
    mkdirSync(paginationBasePath);
  }
  const filePath = join(
    paginationBasePath,
    `homepage-pagination-${pageNumber}.json`
  );
  const dataToSave = JSON.stringify(
    { articles, pageNumber, maxPages },
    null,
    2
  );

  writeFileSync(filePath, dataToSave);
};

type AllPageQuery = {
  allMdx: {
    edges: AllPageQueryNode[];
  };
};

type AllPageQueryNode = {
  node: Article;
};
