import { readFileSync } from 'fs';
import { resolve } from 'path';
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

  if (node.internal.type === `Mdx`) {
    const indexedCategories: Record<string, Category> = Object.fromEntries(
      categories.map(({ slug, parentId, title }: Category) => {
        return [slug, { slug, title, parentId }];
      })
    );

    const parentCategories = Object.fromEntries(
      Object.values(indexedCategories).map(({ parentId, slug }) => {
        return [slug, indexedCategories[parentId || '']];
      })
    );

    // convert image paths for gatsby images
    const parent = getNode(node.parent!);
    const type = parent!.sourceInstanceName;
    const name = parent!.name as string;
    const relativePath = parent!.relativePath as string;

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
      const labels: Record<string, Label> = {};
      (node?.frontmatter?.labels || []).forEach((label) => {
        const slug = slugify(label);
        let [type, name] = label.split(':');
        if (!name) {
          name = type;
          type = 'tag';
        }
        if (indexedCategories[slug]) {
          type = 'category';
        }
        const title = indexedCategories[slug]?.title || name.trim();
        labels[slug] = {
          title,
          slug,
          type,
        };
        if (parentCategories[slug]) {
          const parent = parentCategories[slug];
          labels[parent.slug] = {
            title: parent.title,
            slug: parent.slug,
            type: 'category',
          };
        }
      });
      labels[`${year}`] = {
        title: `${year}`,
        slug: `${year}`,
        type: 'archive',
      };
      labels[`${year}/${month}`] = {
        title: `${year}/${month}`,
        slug: `${year}/${month}`,
        type: 'archive',
      };
      createNodeField({
        node,
        name: `fileSlug`,
        value: fileSlug,
      });
      createNodeField({
        node,
        name: `labels`,
        value: Object.values(labels),
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
      path = node?.frontmatter?.path || `/${slug}/`;
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

export type Label = {
  title: string;
  slug: string;
  type: string;
};

type Category = {
  title: string;
  description: string;
  slug: string;
  parentId?: string;
};
