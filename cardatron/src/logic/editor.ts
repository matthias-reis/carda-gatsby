import { atom, useAtom } from 'jotai';
import { getPath, getRelativePath, readArticle } from './articles';
import { Article } from './types';

// base Atoms
const currentSlugAtom = atom<string>('');
const articlesAtom = atom<Record<string, Article | string>>({});

const setCurrentSlugAtom = atom(null, async (_, set, slug: string) => {
  // we're setting the current atom to the value handed over
  set(currentSlugAtom, slug);
  // then we add
  const path = getPath(slug);
  if (path) {
    set(articlesAtom, (articles) => ({
      ...articles,
      [slug]: 'Lade Artikel. Bitte warten!',
    }));
    const article = await readArticle(path);
    set(articlesAtom, (articles) => ({ ...articles, [slug]: article }));
  } else {
    set(articlesAtom, (articles) => ({
      ...articles,
      [slug]: `Datei konnte nicht geladen werden <${slug}>`,
    }));
  }
});

export const useEditor = () => {
  const [slug] = useAtom(currentSlugAtom);
  const [_get, setSlug] = useAtom(setCurrentSlugAtom);
  const path = getPath(slug);
  const relativePath = getRelativePath(path);
  const [_, year, month, slugIdentifier] = slug.split('/');
  const slugPath = `/${year}/${month}/`;

  return { setSlug, slug, slugPath, slugIdentifier, path, relativePath };
};

export const useCurrentArticle = () => {
  const { slug } = useEditor();
  const [articles] = useAtom(articlesAtom);
  const currentArticle: Article | string = articles[slug]
    ? articles[slug]
    : 'Noch kein Artikel geladen.';

  return {
    currentArticle,
    isEmpty: typeof currentArticle === 'string',
  };
};
