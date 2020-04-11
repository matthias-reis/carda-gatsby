const { resolve } = require('path');

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
    errors.forEach(e => console.error(e.toString()));
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
      labels: frontmatter.labels,
      component,
      context: {
        id
      }
    });

    // labels = [...labels, ...(frontmatter.labels || [])];

    // // Tag pages:
    // // Iterate through each post, putting all found tags into `tags`
    // posts.forEach((edge) => {
    //   if (_.get(edge, `node.frontmatter.tags`)) {
    //     tags = tags.concat(edge.node.frontmatter.tags);
    //   }
    // });
    // // Eliminate duplicate tags
    // tags = _.uniq(tags);

    // // Make tag pages
    // tags.forEach((tag) => {
    //   const tagPath = `/tags/${_.kebabCase(tag)}/`;

    //   createPage({
    //     path: tagPath,
    //     component: path.resolve(`src/templates/tags.js`),
    //     context: {
    //       tag,
    //     },
    //   });
    // });
  }
};
