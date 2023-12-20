import { atom, useAtomValue, useSetAtom } from 'jotai';
import { previewUrl } from './constants';

const viewerPathAtom = atom<string>('/');

export const useViewerPath = () => {
  const path = useAtomValue(viewerPathAtom);
  const url = `${previewUrl}${path}`;
  const isEditable = !!path.match(/\/\d\d\d\d\/\d\d\/.*/); // urls are like /2021/01/foobar
  return { path, url, isEditable };
};

export const useSetViewerPath = () => {
  const setPath = useSetAtom(viewerPathAtom);
  return (newPath: unknown) => {
    if (typeof newPath === 'string') {
      setPath(newPath);
    }
  };
};
