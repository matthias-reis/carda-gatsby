import { atom, useAtom } from 'jotai';

export type LeftRoute = 'splash' | 'editor' | 'new';
export type RightRoute = 'viewer' | 'media' | 'protocol';

const routeAtom = atom<[LeftRoute, RightRoute]>(['splash', 'viewer']);

export const useRoute = () => {
  const [route, setRoute] = useAtom(routeAtom);
  const setLeftRoute = (newRoute: LeftRoute) => setRoute([newRoute, route[1]]);
  const setRightRoute = (newRoute: RightRoute) =>
    setRoute([route[0], newRoute]);
  return { route, setLeftRoute, setRightRoute };
};
