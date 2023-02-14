import { atom, useAtom } from 'jotai';
import { previewUrl } from './constants';
import { existsSync as exists } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(process.cwd(), '../content');

// "" means no path available, everything else assumes a slug
const editorSlugAtom = atom<string>('');
const editorHistoryAtom = atom<string[]>([]);

// a derived atom now tries to load its content
const editorPathAtom = atom<string>((get) => {
  const slug = get(editorSlugAtom);
  const [__, year, month, name] = slug.split('/');
  if (slug === '') return '';
  const oldPath = join(
    ROOT,
    'wordpress/articles',
    `${year}-${month}---${name}.md`
  );
  const newPath = join(ROOT, 'articles', `${slug.slice(0, -1)}.md`);
  console.log(oldPath, exists(oldPath), newPath, exists(newPath));
  return ``;
});

export const useEditor = () => {
  const [_getSlug, setSlug] = useAtom(editorSlugAtom);
  const [getPath] = useAtom(editorPathAtom);

  return { setSlug, getPath };
};
