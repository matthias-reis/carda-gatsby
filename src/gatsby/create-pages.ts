import { resolve } from "path";
import { getPath } from "./slugify";
import { createHash } from "crypto";
import { CreatePagesArgs } from "gatsby";

import { recommend, ArticleTeaser, MdxArticle, Labels } from "./recommend";

const ALL_PAGE_QUERY = `
query MyQuery {
  allMdx {
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
  const { createPage, createNodeField } = actions;

  const { errors, data } = await graphql<AllPageQuery>(ALL_PAGE_QUERY);
  if (errors) {
    errors.forEach((e: Error) => console.error(e.toString()));
    throw new Error(`All page query ended with errors: ${errors.join(", ")}`);
  }

  const edges = data!.allMdx.edges;
  const labels: Labels = {};

  for (const edge of edges) {
    const { id, fields, frontmatter } = edge.node;
    const component = resolve(
      __dirname,
      "../components",
      `article-controller.tsx`
    );
    createPage({
      path: fields.path,
      component,
      context: {
        id,
      },
    });

    for (const label of fields.labels || []) {
      if (!labels[label]) {
        labels[label] = [];
      }
      labels[label].push({
        path: fields.path,
        date: frontmatter.date,
        title: frontmatter.title,
        subTitle: frontmatter.subTitle,
        description: frontmatter.description,
        image: frontmatter.image,
      });
    }
  }

  // create label pages
  for (const label in labels) {
    const path = getPath(label);
    if (path) {
      const component = resolve(
        __dirname,
        "../components",
        `label-controller.tsx`
      );
      createPage({ path, component, context: { label } });
    }
  }

  // fire the recommender engine
  for (const edge of edges) {
    const article = edge.node;
    const recommendations = recommend(article, labels);

    const node = getNode(edge.node.id);

    // save recos to article
    createNodeField({
      node,
      name: "recommendations",
      value: recommendations,
    });
  }
};

type AllPageQuery = {
  allMdx: {
    edges: AllPageQueryNode[];
  };
};

type AllPageQueryNode = {
  node: MdxArticle;
};
