import { atom, useAtom } from 'jotai';

export type RouteVariant = 'default' | 'editor' | 'media';

const routeAtom = atom<RouteVariant>('default');

export const useRoute = () => {
  const [route, setRoute] = useAtom(routeAtom);
  return { route, setRoute };
};
