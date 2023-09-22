import { atom, useAtom } from 'jotai';
import { previewUrl } from './constants';

const viewerPathAtom = atom<string>('/');

const viewerUrlAtom = atom<string>((get) => {
  return `${previewUrl}${get(viewerPathAtom)}`;
});

const isEditableAtom = atom<boolean>((get) => {
  console.log('isEditable', get(viewerPathAtom));
  return !!get(viewerPathAtom).match(/\/\d\d\d\d\/\d\d\/.*/);
});

export const useViewer = () => {
  const [path, setPath] = useAtom(viewerPathAtom);
  const [url] = useAtom(viewerUrlAtom);
  const [isEditable] = useAtom(isEditableAtom);

  return { path, url, isEditable, setPath };
};
