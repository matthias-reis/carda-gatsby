import { atom, useAtom } from 'jotai';
import {
  getPath,
  getRelativePath,
  readArticle,
  writeArticle,
} from './articles';
import { Article } from './types';

// base Atoms
const currentSlugAtom = atom<string>('');
const loadedArticlesAtom = atom<Record<string, Article | string>>({});
const modifiedArticlesAtom = atom<Record<string, Article | string>>({});

const setCurrentSlugAtom = atom(null, async (_, set, slug: string) => {
  // we're setting the current atom to the value handed over
  set(currentSlugAtom, slug);
  // then we add
  const path = getPath(slug);
  if (path) {
    set(modifiedArticlesAtom, (articles) => ({
      ...articles,
      [slug]: 'Lade Artikel. Bitte warten!',
    }));
    const article = await readArticle(path);
    const articleClone = structuredClone(article);
    set(modifiedArticlesAtom, (articles) => ({ ...articles, [slug]: article }));
    set(loadedArticlesAtom, (articles) => ({
      ...articles,
      [slug]: articleClone,
    }));
  } else {
    set(modifiedArticlesAtom, (articles) => ({
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
  const [modifiedArticles, setModifiedArticles] = useAtom(modifiedArticlesAtom);
  const [loadedArticles, setLoadedArticles] = useAtom(loadedArticlesAtom);
  const [_, setCurrentSlug] = useAtom(setCurrentSlugAtom);

  const currentArticle: Article | string = modifiedArticles[slug]
    ? modifiedArticles[slug]
    : 'Noch kein Artikel geladen.';

  const loadedArticle: Article | string = loadedArticles[slug]
    ? loadedArticles[slug]
    : '';

  const isEmpty = typeof currentArticle === 'string';

  const changeCurrentArticle = (changeFn: (a: Article) => Article) => {
    if (!isEmpty) {
      const changedArticle = { ...changeFn(currentArticle), isDirty: true };
      setModifiedArticles({ ...modifiedArticles, [slug]: changedArticle });
    }
  };

  const saveCurrentArticle = async () => {
    // save the article
    console.log(
      'editor',
      (currentArticle as Article).slug,
      (loadedArticle as Article).slug
    );
    const newSlug = await writeArticle(currentArticle, loadedArticle);
    // clean the loaded files
    delete modifiedArticles[slug];
    setModifiedArticles(modifiedArticles);
    delete loadedArticles[slug];
    setModifiedArticles(loadedArticles);
    // then reload it from scratch by re-setting the slug
    setCurrentSlug(newSlug);
  };

  return {
    currentArticle,
    changeCurrentArticle,
    saveCurrentArticle,
    isEmpty,
  };
};
