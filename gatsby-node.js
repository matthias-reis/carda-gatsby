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
              slug
            }
            parent {
              ... on File {
                sourceInstanceName
              }
            }
            frontmatter {
              date(formatString: "YYYY-MM")
              title
              slug
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
    let slug = '';
    if (parent.sourceInstanceName === 'articles') {
      const [year, month] = frontmatter.date.split('-');
      slug = `/${year}/${month}/${fields.slug.split('---')[1]}`;
    } else if (parent.sourceInstanceName === 'pages') {
      slug = `/pages${fields.slug}`;
    }
    createPage({
      path: slug,
      labels: frontmatter.labels,
      component: path.resolve(`src/components/page-article.js`),
      context: {
        id,
        ...frontmatter,
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
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
