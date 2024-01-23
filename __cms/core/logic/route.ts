import { atom, useAtom } from 'jotai';

export type LeftRoute = 'wait' | 'splash' | 'editor' | 'new';
export type RightRoute = 'wait' | 'viewer' | 'media' | 'protocol';

const leftRouteAtom = atom<LeftRoute>('wait');
const rightRouteAtom = atom<RightRoute>('wait');

export const useRoute = () => {
  const [leftRoute, setLeftRoute] = useAtom(leftRouteAtom);
  const [rightRoute, setRightRoute] = useAtom(rightRouteAtom);

  return { leftRoute, rightRoute, setLeftRoute, setRightRoute };
};
