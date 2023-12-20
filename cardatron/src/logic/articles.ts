import { readFile, rename, writeFile } from 'node:fs/promises';
import fm from 'front-matter';
import { Article } from './types';
import { dirname, join } from 'node:path';
import { existsSync as exists } from 'node:fs';
import dayjs from 'dayjs';
import { sync as mkdirp } from 'mkdirp';
import { stringify } from 'yaml';
import { format } from 'prettier';
import parserMd from 'prettier/parser-markdown';

const ROOT = join(process.cwd(), '../content');

export async function readArticle(path: string): Promise<Article> {
  const rawContent = await readFile(path, 'utf-8');
  const { attributes, body } = fm<Article>(rawContent);
  return { ...attributes, body };
}

export async function newArticle(date: Date, title: string): Promise<string> {
  const article: Article = {
    date: date.toISOString(),
    title,
    subTitle: '',
    type: 'article',
    typeName: 'Artikel',
    description: '',
    labels: [],
    slug: slugify(title),
    body: '',
  };

  const path = pathFromSlug(getSlug(article));

  await writeArticle(article, '');

  return path;
}

export async function writeArticle(
  article: Article | string,
  initialArticle: Article | string
): Promise<string> {
  if (typeof article === 'string') return '';
  const newSlug = getSlug(article);
  const newPath = pathFromSlug(newSlug);
  // check if path is changing
  if (typeof initialArticle !== 'string') {
    const oldPath = pathFromSlug(getSlug(initialArticle));

    if (oldPath !== newPath) {
      //move
      mkdirp(dirname(newPath));
      await rename(oldPath, newPath);
    }
  }

  const content = createFileContent(article);
  await writeFile(newPath, content, 'utf-8');

  return newSlug;
}

export const getPath = (slug: string) => {
  if (slug === '') return '';
  const path = pathFromSlug(slug);
  if (!exists(path)) return '';
  return path;
};
const pathFromSlug = (slug: string) => {
  if (slug === '') return '';
  const path = join(ROOT, 'articles', `${slug.slice(0, -1)}.md`);
  return path;
};

export const getRelativePath = (path: string) => path.replace(ROOT, '/content');

export const getSlug = (article: Article) => {
  return `/${dayjs(article.date).format('YYYY/MM')}/${article.slug}/`;
};

const createFileContent = (article: Article) => {
  const { isDirty, body, ...frontmatter } = article;

  const content = `---
${stringify(frontmatter)}---

${body}
`;

  return format(content, {
    parser: 'mdx',
    printWidth: 60,
    proseWrap: 'always',
    plugins: [parserMd],
  });
};

export const slugify = (s: string) =>
  s
    .toString()
    .toLowerCase()
    .replace(/&/g, ' und ')
    .replace(/è/g, 'e')
    .replace(/'/g, '')
    .replace(/é/g, 'e')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ø/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/ /g, '-');
