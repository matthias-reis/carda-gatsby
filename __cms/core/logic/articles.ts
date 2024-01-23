import { readFile, rename, writeFile } from 'node:fs/promises';
import fm from 'front-matter';
import { Article } from './types';
import { dirname, join } from 'path';
// import { existsSync as exists } from 'node:fs';
import { sync as mkdirp } from 'mkdirp';

const ROOT = `${process.cwd().replace('/cms', '')}/content/articles')`;

export async function readArticle(slug: string): Promise<Article> {
  const res = await fetch(`/article?slug=${slug}`);
  const article = await res.json();
  return article;
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

  const slug = await writeArticle(article, '');

  return pathFromSlug(slug);
}

export async function writeArticle(
  article: Article | string,
  initialArticle: Article | string
): Promise<string> {
  if (typeof article === 'string') return '';
  const result = await fetch('/article', {
    method: 'POST',
    body: JSON.stringify({ article, initialArticle }),
  }).then((res) => res.json());

  return result.slug;
}

export const getPath = (slug: string) => `${ROOT}/${slug}.md`;

export const getRelativePath = (path: string) => path.replace(ROOT, '');

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

const pathFromSlug = (slug: string) => {
  if (slug === '') return '';
  const path = join(ROOT, 'articles', `${slug.slice(0, -1)}.md`);
  return path;
};
