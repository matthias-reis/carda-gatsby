import { FC, useCallback, useEffect, useRef } from 'react';
import {
  Pencil2Icon as EditIcon,
  ExternalLinkIcon as OpenIcon,
} from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { useSetViewerPath, useViewerPath } from './viewer-data';
import { useSetEditorSlug } from './editor-data';

export const ViewerPanel: FC = () => {
  const previewEl = useRef<HTMLIFrameElement>(null);
  const setPath = useSetViewerPath();
  const setEditorSlug = useSetEditorSlug();
  const { isEditable, path, url } = useViewerPath();

  const handleMessage = useCallback(
    (ev: MessageEvent<string>) => {
      if (typeof ev.data === 'string') {
        setPath(ev.data);
      }
    },
    [setPath]
  );

  useEffect(() => {
    if (previewEl.current) {
      window.addEventListener('message', handleMessage, false);

      return () => window.removeEventListener('message', handleMessage);
    }
  }, [handleMessage, previewEl]);

  return (
    <div className="flex flex-col items-stretch justify-stretch h-full">
      <div className="bg-stone-800 border-b border-stone-700 p-2 flex items-center gap-2 text-stone-400 w-full">
        <Button
          size="sm"
          onClick={() => setEditorSlug(path)}
          disabled={!isEditable}
        >
          <EditIcon />
        </Button>
        <pre className="flex-grow flex-shrink font-mono text-sm text-ellipsis overflow-hidden">
          {path}
        </pre>
        <Button variant="secondary" size="sm" onClick={console.log} asChild>
          <a href={url} target="_blank">
            <OpenIcon />
          </a>
        </Button>
      </div>
      <div className="flex-1">
        <iframe
          src="http://localhost:8000"
          ref={previewEl}
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
};
