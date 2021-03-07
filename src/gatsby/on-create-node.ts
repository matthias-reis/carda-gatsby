import { fmImagesToRelative } from 'gatsby-remark-relative-images';
import { createFilePath } from 'gatsby-source-filesystem';
import { slugify } from './slugify';
import { CreateNodeArgs } from 'gatsby';

export const onCreateNode = ({
  node,
  actions,
  getNode,
}: CreateNodeArgs<Node>) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node);
  if (node.internal.type === `Mdx`) {
    // convert image paths for gatsby images
    const parent = getNode(node.parent!);
    const type = parent.sourceInstanceName;
    const value = createFilePath({ node, getNode }).replace(/\//g, '');
    const rawSlug = node?.frontmatter?.slug || node?.frontmatter?.title || '';
    const slug = slugify(rawSlug);

    let path = '';
    if (type === 'article' || type === 'wordpress') {
      const date = value.split('---')[0];
      const [year, month] = date.split('-');
      path = node?.frontmatter?.path || `/${year}/${month}/${slug}/`;
      const labels = [
        ...(node?.frontmatter?.labels || []),
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
      path = `/${slug}`;
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

type Node = {
  frontmatter?: {
    title: string;
    path?: string;
    slug?: string;
    labels: string[];
  };
};
