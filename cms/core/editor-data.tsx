import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Article } from './types';
import { useLeftPanel } from './workspaces-data';
import { log } from './log';

type State = 'loading' | 'available' | 'dirty' | 'error';
type Entry = [State, Article | null];
type Entries = Record<string, Entry>;

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
  let article: Entry = articles[slug] || ['loading', null, null];
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

export async function writeArticle(
  article: Article | string,
  initialSlug: string
): Promise<string> {
  if (typeof article === 'string') return '';
  const result = await fetch('/article', {
    method: 'POST',
    body: JSON.stringify({ article, initialSlug }),
  }).then((res) => res.json());

  return result.slug;
}

// HOOKS
export const useArticle = () => {
  const [slug, setSlug] = useAtom(currentSlugAtom);
  const [articles, setArticles] = useAtom(articlesAtom);

  let article: Entry = ['error', null];

  if (!articles[slug]) {
    log('editor/useArticle', `no article found <${slug}>`, 'warn');
  } else {
    article = articles[slug];
  }

  const change = (changeFn: (a: Article) => Article) => {
    if (article[1]) {
      const changedArticle: Entry = ['dirty', changeFn(article[1])];

      setArticles({ ...articles, [slug]: changedArticle });
    }
  };

  const save = async () => {
    if (article[0] !== 'dirty') return;

    // save the article
    try {
      log('editor/saveArticle', `saving <${slug}>`);
      const newSlug = await writeArticle(article[1]!, slug);
      if (newSlug !== slug) {
        // if the slug has changed, we need to delete the old one
        delete articles[slug];
      }
      articles[newSlug] = ['available', article[1]];
      setArticles(articles);
      // then reload it from scratch by re-setting the slug
      setSlug(newSlug);

      log('editor/saveArticle', `saved under <${newSlug}>`);
    } catch (e) {
      log('editor/saveArticle', `could not save article`, e as Error);
      return;
    }
  };

  return { slug, state: article[0], article: article[1], save, change };
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

export const useAllArticles = () => {
  const articles = useAtomValue(articlesAtom);
  return articles;
};
