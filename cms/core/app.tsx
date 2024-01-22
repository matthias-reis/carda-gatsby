'use client';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { FC } from 'react';
import { LeftWorkspace, RightWorkspace } from './workspaces';
import { useLeftPanel, useRightPanel } from './workspaces-data';
import { Provider as JotaiProvider } from 'jotai';

export const App: FC = () => {
  const { isOpened: leftOpened } = useLeftPanel();
  const { isOpened: rightOpened } = useRightPanel();
  return (
    <JotaiProvider>
      <ResizablePanelGroup direction="horizontal">
        {leftOpened && (
          <ResizablePanel defaultSize={50}>
            <LeftWorkspace />
          </ResizablePanel>
        )}
        {leftOpened && rightOpened && <ResizableHandle />}
        {rightOpened && (
          <ResizablePanel defaultSize={50}>
            <RightWorkspace />
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </JotaiProvider>
  );
};
