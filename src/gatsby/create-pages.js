const { resolve } = require('path');
const { getPath } = require('./slugify');

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

module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const { errors, data } = await graphql(ALL_PAGE_QUERY);
  if (errors) {
    errors.forEach((e) => console.error(e.toString()));
    throw new Error(`All page query ended with errors: ${errors.join(', ')}`);
  }

  const edges = data.allMdx.edges;
  let labels = [];

  for (const edge of edges) {
    const { id, fields, parent, frontmatter } = edge.node;
    const component = resolve(
      __dirname,
      '../components',
      `article-controller.js`
    );
    createPage({
      path: fields.path,
      labels: fields.labels,
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
        `label-controller.js`
      );
      createPage({ path, component, label, context: { label } });
    }
  }
};
