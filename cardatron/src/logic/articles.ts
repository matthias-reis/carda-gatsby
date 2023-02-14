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
      console.log('article', 'paths difffer', oldPath, initialArticle.slug);
      console.log('article', 'newDir', dirname(newPath));
      //move
      mkdirp(dirname(newPath));
      await rename(oldPath, newPath);
    }
  }
  console.log('article', 'back outside');

  const content = createFileContent(article);
  console.log('article', content);
  await writeFile(newPath, content, 'utf-8');
  console.log('article', 'file written');

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

export const getRelativePath = (path: string) => path.replace(ROOT, '');

export const getSlug = (article: Article) => {
  return `/${dayjs(article.date).format('YYYY/MM')}/${article.slug}/`;
};

const createFileContent = (article: Article) => {
  const { isDirty, body, ...frontmatter } = article;

  const content = `---
${stringify(frontmatter)}
---

${body}
`;

  return format(content, {
    parser: 'mdx',
    printWidth: 60,
    plugins: [parserMd],
  });
};
