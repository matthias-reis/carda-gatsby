import { atom, useAtom } from 'jotai';

export type RouteVariant = 'default' | 'editor' | 'media';

const routeAtom = atom<RouteVariant>('default');

export const useRoute = () => useAtom(routeAtom);
