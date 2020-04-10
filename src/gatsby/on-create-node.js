const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const { createFilePath } = require('gatsby-source-filesystem');

module.exports = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images
  if (node.internal.type === `Mdx`) {
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
