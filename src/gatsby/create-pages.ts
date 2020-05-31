import { resolve } from 'path';
import { getPath } from './slugify';
import { CreatePagesArgs } from 'gatsby';

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
          labels
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
    throw new Error(`All page query ended with errors: ${errors.join(', ')}`);
  }

  const edges = data!.allMdx.edges;
  let labels: string[] = [];

  for (const edge of edges) {
    const { id, fields } = edge.node;
    const component = resolve(
      __dirname,
      '../components',
      `article-controller.tsx`
    );
    createPage({
      path: fields.path,
      component,
      context: {
        id,
      },
    });

    labels = [...labels, ...(fields.labels || [])];
  }

  // create label pages
  labels = Array.from(new Set(labels));
  for (const label of labels) {
    const path = getPath(label);
    if (path) {
      const component = resolve(
        __dirname,
        '../components',
        `label-controller.tsx`
      );
      createPage({ path, component, context: { label } });
    }
  }
};

type AllPageQuery = {
  allMdx: {
    edges: AllPageQueryNode[];
  };
};

type AllPageQueryNode = {
  node: {
    id: string;
    fields: {
      path: string;
      month: string;
      year: string;
      type: string;
      labels: string[];
    };
    frontmatter: {
      labels: string[];
    };
  };
};
