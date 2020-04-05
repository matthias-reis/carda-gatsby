const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

const ALL_PAGE_QUERY = `
    {
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              path
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

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const { errors, data } = await graphql(ALL_PAGE_QUERY);
  if (errors) {
    errors.forEach((e) => console.error(e.toString()));
    throw new Error(`All page query ended with errors: ${errors.join(', ')}`);
  }

  const edges = data.allMarkdownRemark.edges;
  let labels = [];

  for (const edge of edges) {
    const { id, fields, parent, frontmatter } = edge.node;
    const component = path.resolve(
      `src/components/${fields.type}-container.js`
    );
    createPage({
      path: fields.path,
      labels: frontmatter.labels,
      component,
      context: {
        id,
      },
    });

    labels = [...labels, ...(frontmatter.labels || [])];

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

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images
  if (node.internal.type === `MarkdownRemark`) {
    const parent = getNode(node.parent);
    const type = parent.sourceInstanceName;
    const value = createFilePath({ node, getNode }).replace(/\//g, '');
    const slug = value.split('---')[1] || value;

    let path = '';
    if (type === 'article') {
      const date = value.split('---')[0];
      const [year, month] = date.split('-');
      path = `/${year}/${month}/${slug}`;
      createNodeField({
        node,
        name: `year`,
        value: year,
      });
      createNodeField({
        node,
        name: `month`,
        value: month,
      });
    } else if (type === 'page') {
      path = `/pages/${slug}`;
    }

    createNodeField({
      node,
      name: `type`,
      value: type,
    });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
    createNodeField({
      node,
      name: `path`,
      value: path,
    });
  }
};
