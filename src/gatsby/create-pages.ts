import { resolve, join } from "path";
import { getPath } from "./slugify";
import { CreatePagesArgs } from "gatsby";

import { recommend, MdxArticle, Labels } from "./recommend";
import { existsSync, mkdirSync, writeFileSync } from "fs";

const paginationBasePath = join(__dirname, "../../public/homepage-data");

const ALL_PAGE_QUERY = `
query MyQuery {
  allMdx(
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
          labels
        }
        frontmatter {
          title
          subTitle
          date
          description
          image { 
            absolutePath
          }
        }
      }
    }
  }
}
`;

export const createPages = async ({ actions, graphql }: CreatePagesArgs) => {
  const { createPage } = actions;

  const { errors, data } = await graphql<AllPageQuery>(ALL_PAGE_QUERY);
  if (errors) {
    errors.forEach((e: Error) => console.error(e.toString()));
    throw new Error(`All page query ended with errors: ${errors.join(", ")}`);
  }

  const edges = data!.allMdx.edges;
  const labels: Labels = {};

  for (const edge of edges) {
    const { fields } = edge.node;
    for (const label of fields.labels || []) {
      if (!labels[label]) {
        labels[label] = [];
      }
      labels[label].push(edge.node);
    }
  }

  // create label pages
  for (const label in labels) {
    const path = getPath(label);
    if (path) {
      const component = resolve(
        __dirname,
        "../components",
        `list-controller.tsx`
      );
      createPage({ path, component, context: { label } });
    }
  }

  for (const edge of edges) {
    const article = edge.node;

    // fire the recommender engine`
    const recommendations = recommend(article, labels);

    const component = resolve(
      __dirname,
      "../components",
      `article-controller.tsx`
    );

    // create a gatsby page for each article / static page including recommendations
    createPage({
      path: edge.node.fields.path,
      component,
      context: {
        id: edge.node.id,
        recommendations: recommendations.map((r) => r.articleId), // recos are now in context and can be used in the query
      },
    });
  }

  // creating the homepage pagination
  // 30 articles on each additional page
  // first filter static pages
  const articles = edges
    .map((edge) => edge.node)
    .filter((node) => node.fields.type !== "post")
    // the first 23 articles are displayed already
    .slice(23);

  //package articles into 50
  const getSliced = (arr: MdxArticle[], n: number): MdxArticle[][] => {
    if (arr.length) {
      return [arr.slice(0, n), ...getSliced(arr.slice(n), n)];
    } else {
      return [];
    }
  };
  const packs = getSliced(articles, 50);

  packs.forEach((pack, i) => writePackToJson(pack, i + 1, packs.length));
};

const writePackToJson = (
  articles: MdxArticle[],
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
  node: MdxArticle;
};
