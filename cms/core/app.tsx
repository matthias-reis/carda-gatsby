'use client';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { FC } from 'react';
import { LeftWorkspace, RightWorkspace } from './workspaces';
import { useLeftPanel, useRightPanel } from './workspaces-data';

export const App: FC = () => {
  const { isOpened: leftOpened } = useLeftPanel();
  const { isOpened: rightOpened } = useRightPanel();

  if (!rightOpened) return <LeftWorkspace />;
  if (!leftOpened) return <RightWorkspace />;

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={50}>
        <LeftWorkspace />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel order={1} defaultSize={50}>
        <RightWorkspace />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
