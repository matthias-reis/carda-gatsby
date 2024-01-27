import { FC, useEffect } from 'react';
import { useArticle } from './editor-data';
import {
  CheckboxIcon as SaveIcon,
  GlobeIcon as PublishIcon,
  EyeOpenIcon as ViewIcon,
} from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Wait } from '@/components/wait';
import { log } from './log';
import { EditorContent } from './editor-content';
import { useSetViewerPath } from './viewer-data';

const states = {
  loading: 'Wird geladen ...',
  available: 'Verfügbar',
  dirty: 'Editiert',
  error: 'Fehler',
};

export const EditorPanel: FC = () => {
  const { slug, state, article, change, save } = useArticle();
  const setViewerPath = useSetViewerPath();
  let title = article ? article.title : 'Bitte warten ...';

  if (state === 'error') {
    title = 'Ein Fehler ist aufgetreten ...';
  }

  useEffect(() => {
    log('editor/render', `status <${state}> for <${slug}>`);
  }, [state, slug]);

  return (
    <div className="flex flex-col items-stretch justify-stretch h-full">
      <div className="bg-stone-800  p-2 flex items-end gap-2 text-stone-400 w-full">
        <div className="flex-grow flex-shrink font-condensed text-nowrap text-sm text-ellipsis overflow-hidden">
          {states[state]}
        </div>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => save()}
            disabled={state !== 'dirty'}
          >
            <SaveIcon />
          </Button>
          <Button size="sm" variant="secondary" onClick={console.log}>
            <PublishIcon />
          </Button>
          <Button size="sm" onClick={() => setViewerPath(slug)}>
            <ViewIcon />
          </Button>
        </div>
      </div>
      <h2 className="bg-stone-800 px-2 font-condensed bold text-2xl">
        {title}
      </h2>
      <p className="bg-stone-800 px-2 font-condensed pb-3 text-xs text-stone-400 border-b border-stone-700">
        {slug}
      </p>
      {state === 'error' && <Error />}
      {state === 'loading' && <Loading />}
      {(state === 'available' || state === 'dirty') && (
        <EditorContent article={article!} change={change} save={save} />
      )}
    </div>
  );
};

const Error: FC = () => {
  return (
    <div className="text-sm font-condensed text-red-300 p-10">
      <p>Ein Fehler ist aufgetreten. Bitte führe folgende Schritte durch:</p>
      <ul className="list-disc list-outside ml-4">
        <li>
          Lade die Seite neu (cmd+r) und versuche den Artikel nochmal in den
          Editor zu laden.
        </li>
        <li>Öffne die Dev Tools (cmd+ i) und wechsle in das tab `Console`</li>
        <li>Falls dort nichts sinnvolles zu sehen is, ruf Matze</li>
      </ul>
    </div>
  );
};

const Loading: FC = () => {
  return <Wait />;
};
