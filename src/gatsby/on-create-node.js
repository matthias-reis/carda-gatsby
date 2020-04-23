const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const { createFilePath } = require('gatsby-source-filesystem');
const { slugify } = require('./slugify');

module.exports = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images
  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);
    const type = parent.sourceInstanceName;
    const value = createFilePath({ node, getNode }).replace(/\//g, '');
    const slug = slugify(node.frontmatter.title);

    let path = '';
    if (type === 'article' || type === 'wordpress') {
      const date = value.split('---')[0];
      const [year, month] = date.split('-');
      path = `/${year}/${month}/${slug}`;
      const labels = [
        ...node.frontmatter.labels,
        `${year}`,
        `${year}/${month}`,
      ];
      createNodeField({
        node,
        name: `labels`,
        value: labels,
      });
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
