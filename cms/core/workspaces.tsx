'use client';
import { FC } from 'react';
import { Logo } from '@/components/logo';
import {
  Pencil2Icon as EditIcon,
  FilePlusIcon as NewIcon,
  ImageIcon as MediaIcon,
  EyeOpenIcon as ViewIcon,
  ActivityLogIcon as LogIcon,
  Cross2Icon as CloseIcon,
  ViewVerticalIcon as OpenIcon,
} from '@radix-ui/react-icons';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';

import {
  LeftPanel,
  RightPanel,
  useLeftPanel,
  useRightPanel,
} from './workspaces-data';
import { EditorPanel } from './editor-panel';
import { NewPanel } from './new-panel';
import { ViewerPanel } from './viewer-panel';
import { MediaPanel } from './media-panel';
import { WaitPanel } from './wait-panel';
import { SplashPanel } from './splash-panel';

const titles: Record<LeftPanel | RightPanel, string> = {
  splash: '',
  editor: 'Editor',
  new: 'Neu',
  viewer: 'Vorschau',
  media: 'Medien',
};

const panels = {
  editor: <EditorPanel />,
  new: <NewPanel />,
  viewer: <ViewerPanel />,
  media: <MediaPanel />,
  splash: <SplashPanel />,
};

export const LeftWorkspace: FC = () => {
  const { isOpened: rightOpened, toggle: rightToggle } = useRightPanel();
  const { panel, set, toggle } = useLeftPanel();
  const visiblePanel = panels[panel];
  return (
    <div className="h-full p-3 flex flex-col gap-2">
      <nav className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Logo width={32} height={32} />
          <div className="font-bold text-2xl font-condensed mr-4 text-stone-500">
            Anne CMS
          </div>
          <ToggleGroup
            type="single"
            value={panel}
            onValueChange={(value: LeftPanel) => set(value)}
          >
            <ToggleGroupItem value="editor">
              <NewIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="new">
              <EditIcon />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="text-sm uppercase text-stone-500">{titles[panel]}</div>
        {rightOpened ? (
          <Button variant="secondary" size="sm" onClick={toggle}>
            <CloseIcon />
          </Button>
        ) : (
          <Button variant="secondary" size="sm" onClick={rightToggle}>
            <OpenIcon />
          </Button>
        )}
      </nav>
      <section className="bg-stone-950 rounded-sm border border-stone-700 flex-1 overflow-y-auto">
        {visiblePanel}
      </section>
    </div>
  );
};

export const RightWorkspace: FC = () => {
  const { isOpened: leftOpened, toggle: leftToggle } = useLeftPanel();
  const { panel, set, toggle } = useRightPanel();
  const visiblePanel = panels[panel];

  return (
    <div className="h-full p-3 flex flex-col gap-2">
      <nav className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          {!leftOpened && <Logo width={32} height={32} />}
          {!leftOpened && (
            <div className="font-bold text-2xl font-condensed mr-4 text-stone-500">
              Anne CMS
            </div>
          )}
          <ToggleGroup
            type="single"
            value={panel}
            onValueChange={(value: RightPanel) => set(value)}
          >
            <ToggleGroupItem value="viewer">
              <ViewIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="media">
              <MediaIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="log">
              <LogIcon />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="text-sm uppercase text-stone-500">{titles[panel]}</div>
        {leftOpened ? (
          <Button variant="secondary" size="sm" onClick={toggle}>
            <CloseIcon />
          </Button>
        ) : (
          <Button variant="secondary" size="sm" onClick={leftToggle}>
            <OpenIcon />
          </Button>
        )}
      </nav>
      <section className="bg-stone-950 rounded-sm border border-stone-700 flex-1 overflow-y-auto">
        {visiblePanel}
      </section>
    </div>
  );
};
