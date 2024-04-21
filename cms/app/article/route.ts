import { Article } from '@/core/types';
import fm from 'front-matter';
import { readFile, rename, writeFile } from 'node:fs/promises';
import dayjs from 'dayjs';
import { dirname, join } from 'node:path';
import { mkdirp } from 'mkdirp';
import { stringify } from 'yaml';
import parserMd from 'prettier/parser-markdown';
import { format } from 'prettier';

const ROOT = `${process.cwd().replace('/cms', '')}/content/articles`;

export async function GET(request: Request) {
  let slug = new URL(request.url).searchParams.get('slug');
  console.log(`[article/get] ${slug}`);

  if (!slug) return new Response('no slug provided', { status: 400 });

  if (slug.endsWith('/')) slug = slug.slice(0, -1);
  const path = `${process.cwd()}/content/articles${slug}.md`.replace(
    '/cms',
    ''
  );

  try {
    const rawContent = await readFile(path, 'utf-8');
    const { attributes, body } = fm<Article>(rawContent);
    console.log(`[article/get] found file under <${path}>`);
    const _titleSlug = slug.split('/').at(-1);
    return Response.json({ ...attributes, body, _titleSlug });
  } catch (error) {
    console.log(`[article/get] 🛑 no file under <${path}>`);
    return new Response('file not found', { status: 404 });
  }
}

export async function POST(request: Request) {
  const { article, initialSlug } = await request.json();
  console.log(`[article/post] save request for <${initialSlug}>`);
  if (!article) {
    console.log('[article/post] 🛑 no article provided in request');
    return new Response('no article provided', { status: 400 });
  }

  const newSlug = getSlug(article);
  delete article._titleSlug;
  const newPath = pathFromSlug(newSlug);

  console.log(`[article/post] try to save <${newPath}>`);

  if (initialSlug && initialSlug !== newSlug) {
    const oldPath = pathFromSlug(initialSlug);
    console.log(`[article/post] moving article from <${oldPath}>`);
    // move
    try {
      mkdirp(dirname(newPath));
      await rename(oldPath, newPath);
    } catch (e) {
      console.log(
        `[article/post] 🛑 could not move <${oldPath}> to <${newPath}>`
      );
      return new Response(`could not move file <${oldPath}>`, { status: 500 });
    }
  }

  const content = createFileContent(article);
  try {
    await writeFile(newPath, content, 'utf-8');
    console.log(`[article/post] saved <${newPath}>`);
  } catch (error) {
    console.log(`[article/post] 🛑 could not write <${newPath}>`);
    return new Response(`could not write file <${newPath}>`, { status: 500 });
  }

  return Response.json({ slug: newSlug });
}

const getSlug = (article: Article) => {
  return `/${dayjs(article.date).format('YYYY/MM')}/${article._titleSlug}/`;
};

const pathFromSlug = (slug: string) => {
  if (slug === '') return '';
  const path = join(ROOT, `${slug.slice(0, -1)}.md`);
  return path;
};

const createFileContent = (article: Article) => {
  const { isDirty, body, ...frontmatter } = article;

  const content = `---
${stringify(frontmatter)}---

${body}
`;

  return format(content, {
    parser: 'mdx',
    proseWrap: 'never',
    plugins: [parserMd],
  });
};
