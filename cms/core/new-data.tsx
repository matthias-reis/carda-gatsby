import { useArticle, useSetEditorSlug, writeArticle } from './editor-data';
import { log } from './log';
import { Article } from './types';
import { useLeftPanel } from './workspaces-data';

export const useNewArticle = () => {
  const { set: setLeftPanel } = useLeftPanel();
  const setSlug = useSetEditorSlug();

  const createArticle = async (
    title: string,
    date: Date,
    language: 'de' | 'en'
  ) => {
    log('new/hook', `create article <${title}>`);
    try {
      const slug = await newArticle(date, title, language);
      log('new/hook', `article created under <${slug}>`);
      setLeftPanel('editor');
      setSlug(slug);
    } catch (e) {
      log('new/hook', `could not create article`, e as Error);
    }
  };

  return { createArticle };
};

export async function newArticle(
  date: Date,
  title: string,
  language: 'de' | 'en'
): Promise<string> {
  const article: Article = {
    date: date.toISOString(),
    title,
    subTitle: '',
    type: 'article',
    typeName: 'Artikel',
    description: '',
    labels: [],
    slug: slugify(title),
    language,
    body: '',
  };

  const slug = await writeArticle(article, '');

  return slug;
}

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
