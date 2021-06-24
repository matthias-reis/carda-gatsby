import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fmImagesToRelative } from 'gatsby-remark-relative-images';
import { createFilePath } from 'gatsby-source-filesystem';
import { slugify } from './slugify';
import { CreateNodeArgs } from 'gatsby';
import YAML from 'yaml';

const rawCategories = readFileSync(
  resolve(__dirname, '../../content/config/categories.yml'),
  'utf-8'
);
const categories = YAML.parse(rawCategories);

export const onCreateNode = async ({
  node,
  actions,
  getNode,
}: CreateNodeArgs<Node>) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node);

  if (node.internal.type === `Mdx`) {
    const indexedCategories: Record<string, Category> = Object.fromEntries(
      categories.map(({ slug, parentId, title }: Category) => {
        return [slug, { slug, title, parentId }];
      })
    );

    const parentCategories = Object.fromEntries(
      Object.values(indexedCategories).map(({ parentId, title }) => {
        const parentTitle = indexedCategories[parentId || '']?.title;
        return [title, parentTitle];
      })
    );

    // convert image paths for gatsby images
    const parent = getNode(node.parent!);
    const type = parent.sourceInstanceName;
    const name = parent.name as string;
    const relativePath = parent.relativePath as string;

    let year: string;
    let month: string;
    let fileSlug: string;
    if (name.indexOf('---') > -1) {
      // format is 2020-01---name-with-dashes
      const [d, s] = name.split('---');
      [year, month] = d.split('-');
      fileSlug = s.replace('.md', '');
    } else {
      // format is 2020/01/name-with-dashes
      [year, month, fileSlug] = relativePath.split('/');
      fileSlug = fileSlug.replace('.md', '');
    }
    const rawSlug = node?.frontmatter?.slug || node?.frontmatter?.title || '';
    const slug = slugify(rawSlug);

    let path = '';
    if (type === 'article' || type === 'wordpress') {
      path = node?.frontmatter?.path || `/${year}/${month}/${slug}/`;
      const labels = new Set([
        ...(node?.frontmatter?.labels || []),
        `${year}`,
        `${year}/${month}`,
      ]);
      (node?.frontmatter?.labels || []).forEach((l) => {
        if (parentCategories[l]) {
          labels.add(parentCategories[l]);
        }
      });
      createNodeField({
        node,
        name: `fileSlug`,
        value: fileSlug,
      });
      createNodeField({
        node,
        name: `labels`,
        value: Array.from(labels),
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

type Category = {
  title: string;
  description: string;
  slug: string;
  parentId?: string;
};
