import { atom, useAtom } from 'jotai';

export type LeftPanel = 'splash' | 'editor' | 'new';

export type RightPanel = 'viewer' | 'media';

const leftPanelAtom = atom<[LeftPanel, boolean]>(['splash', true]);

const rightPanelAtom = atom<[RightPanel, boolean]>(['viewer', true]);

export const useLeftPanel = () => {
  const [[panel, isOpened], setLeftPanel] = useAtom(leftPanelAtom);

  const set = (panel: LeftPanel) => setLeftPanel([panel, true]);
  const toggle = () => setLeftPanel([panel, !isOpened]);

  return { panel, isOpened, set, toggle };
};

export const useRightPanel = () => {
  const [[panel, isOpened], setRightPanel] = useAtom(rightPanelAtom);

  const set = (panel: RightPanel) => setRightPanel([panel, true]);
  const toggle = () => setRightPanel([panel, !isOpened]);

  return { panel, isOpened, set, toggle };
};
