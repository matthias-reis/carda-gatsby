import { atom, useAtom } from 'jotai';
import {
  getPath,
  getRelativePath,
  readArticle,
  writeArticle,
} from './articles';
import { Article } from './types';
import { simpleGit } from 'simple-git';
import { parse } from 'node:path';

export type Message = {
  level: 'info' | 'warn' | 'error';
  time: number; // timestamp
  message: string;
};

const git = simpleGit();

// base Atoms
const currentSlugAtom = atom<string>('');
const loadedArticlesAtom = atom<Record<string, Article | string>>({});
const modifiedArticlesAtom = atom<Record<string, Article | string>>({});
const messagesAtom = atom<Message[]>([]);

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
  const [messages, setMessages] = useAtom(messagesAtom);
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
    const newSlug = await writeArticle(currentArticle, loadedArticle);
    // clean the loaded files
    delete modifiedArticles[slug];
    setModifiedArticles(modifiedArticles);
    delete loadedArticles[slug];
    setModifiedArticles(loadedArticles);
    // then reload it from scratch by re-setting the slug
    setCurrentSlug(newSlug);
    // and add a message
    setMessages([
      ...messages,
      {
        level: 'info',
        time: Date.now(),
        message: `Article saved ${newSlug}`,
      },
    ]);
  };

  const publish = async () => {
    // commit the state
    await git.stash(['-u']);
    await git.stash(['pop']);
    const status = await git.status();
    console.log(status);
    // await git.add('.');
    // const files = status.modified
    //   .filter((f) => f.endsWith('.md'))
    //   .map((f) => parse(f).name);
    // await git.commit(`Update ${files.join(', ')}`);
    // // pull from current branch
    // await git.pull({ '--rebase': 'true' });
    // // push to current branch
    // await git.push();
  };

  return {
    currentArticle,
    changeCurrentArticle,
    saveCurrentArticle,
    publish,
    isEmpty,
  };
};