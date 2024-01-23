import { Article } from '@/core/logic/types';
import { addLocalLog } from '@/srv/logStash';
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
  if (!slug) return new Response('no slug provided', { status: 400 });
  if (slug.endsWith('/')) slug = slug.slice(0, -1);
  const path = `${process.cwd()}/content/articles/${slug}.md`.replace(
    '/cms',
    ''
  );

  try {
    const rawContent = await readFile(path, 'utf-8');
    const { attributes, body } = fm<Article>(rawContent);
    addLocalLog('article', `serving <${slug}>`);
    return Response.json({ ...attributes, body });
  } catch (error) {
    addLocalLog('article', `not found <${path}>`, 'error');
    return new Response('file not found', { status: 404 });
  }
}

export async function POST(request: Request) {
  const { article, initialArticle } = await request.json();
  const newSlug = getSlug(article);
  const newPath = pathFromSlug(newSlug);
  console.log({ newSlug, newPath });
  addLocalLog('article', `writing <${newPath}>`);
  if (initialArticle && typeof initialArticle !== 'string') {
    const oldPath = pathFromSlug(getSlug(initialArticle));

    if (oldPath !== newPath) {
      // move
      addLocalLog('article', `move from <${oldPath}> to <${newPath}>`);
      mkdirp(dirname(newPath));
      await rename(oldPath, newPath);
    }
  }
  const content = createFileContent(article);
  try {
    await writeFile(newPath, content, 'utf-8');
  } catch (error) {
    return new Response(`could not write file <${newPath}>`, { status: 500 });
  }

  return Response.json({ slug: newSlug });
}

const getSlug = (article: Article) => {
  return `/${dayjs(article.date).format('YYYY/MM')}/${article.slug}/`;
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
