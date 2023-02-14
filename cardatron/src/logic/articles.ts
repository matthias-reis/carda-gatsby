import { readFile } from 'node:fs/promises';
import fm from 'front-matter';
import { Article } from './types';
import { join } from 'node:path';
import { existsSync as exists } from 'node:fs';

const ROOT = join(process.cwd(), '../content');

export async function readArticle(path: string): Promise<Article> {
  const rawContent = await readFile(path, 'utf-8');
  const { attributes, body } = fm<Article>(rawContent);
  return { ...attributes, body };
}

export const getPath = (slug: string) => {
  if (slug === '') return '';
  const path = join(ROOT, 'articles', `${slug.slice(0, -1)}.md`);
  if (!exists(path)) return '';
  return path;
};

export const getRelativePath = (path: string) => path.replace(ROOT, '');
