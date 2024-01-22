import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Article } from './types';
import { useLeftPanel } from './workspaces-data';
import { log } from './log';

type State = 'loading' | 'available' | 'dirty' | 'error';
type Entry = [State, Article | null];
type Entries = Record<string, [State, Article | null]>;

const currentSlugAtom = atom<string>('');
const articlesAtom = atom<Entries>({});

const setCurrentSlugAtom = atom(null, async (get, set, slug: string) => {
  log('editor/setAtom', `set slug <${slug}>`);
  set(currentSlugAtom, slug);
  const articles = get(articlesAtom);

  // we do nothing if the loaded article is dirty
  if (articles[slug] && articles[slug][0] === 'dirty') {
    log('editor/setAtom', `slug locally available -<${slug}>`);
    return;
  }

  // if not, it's being loaded
  let article: Entry = articles[slug] || ['loading', null];
  article[0] = 'loading';
  set(articlesAtom, { ...articles, [slug]: article });

  try {
    const loadedArticle = await readArticle(slug);
    const articleClone = structuredClone(loadedArticle);
    article = ['available', articleClone];
    set(articlesAtom, { ...articles, [slug]: article });
  } catch (e) {
    log('editor/setAtom', `could not load article`, e as Error);
    article = ['error', null];
    set(articlesAtom, { ...articles, [slug]: article });
  }
});

async function readArticle(slug: string): Promise<Article> {
  const res = await fetch(`/article?slug=${slug}`);
  const article: Article = await res.json();
  return article;
}

// HOOKS
export const useArticle = () => {
  const slug = useAtomValue(currentSlugAtom);
  const articles = useAtomValue(articlesAtom);

  let article: Entry = ['error', null];

  if (!articles[slug]) {
    log('editor/useArticle', `no article found <${slug}>`, 'warn');
  } else {
    article = articles[slug];
  }

  return { slug, state: article[0], article: article[1] };
};

export const useSetEditorSlug = () => {
  const { set: setLeftPanel } = useLeftPanel();
  const set = useSetAtom(setCurrentSlugAtom);

  const setSlug = (slug: string) => {
    log('editor/setHook', `set slug <${slug}>`);
    set(slug);
    setTimeout(() => setLeftPanel('editor'), 10);
  };
  return setSlug;
};
