import { atom, useAtom, useAtomValue } from 'jotai';
import { log } from './log';

const viewerPathAtom = atom<string>('/');

export const useViewerPath = () => {
  const path = useAtomValue(viewerPathAtom);
  const url = `http://localhost:3335${path}`;
  const isEditable = !!path.match(/\/\d\d\d\d\/\d\d\/.*/); // urls are like /2021/01/foobar
  return { path, url, isEditable };
};

export const useSetViewerPath = () => {
  const [path, setPath] = useAtom(viewerPathAtom);
  return (newPath: unknown) => {
    if (typeof newPath === 'string' && newPath !== path) {
      log('viewer/setHook', `navigate <${newPath}>`);
      setPath(newPath);
    }
  };
};
