import { FC } from 'react';
import { useAllArticles, useSetEditorSlug } from './editor-data';
import { Card } from '@/components/ui/card';

export const ListPanel: FC = () => {
  const articles = useAllArticles();
  const setPath = useSetEditorSlug();
  return (
    <div className="max-w-xl mx-auto flex flex-col gap-3 p-5 font-condensed">
      <h2 className="text-2xl font-condensed">Geladene Beiträge</h2>
      <p className="text-stone-400">
        Zum schnellen zurückspringen zu aktuellen Änderungen findest Du hier
        alle geladenen Beiträge.
      </p>
      <p className="text-stone-400">
        Die Liste geht nur bis zum letzten Aufrufen der Seite zurück (CMD+R).
        Daher ist es zu empfehlen, Artikel regelmäßig zu speichern, damit keine
        Arbeit verloren geht.
      </p>
      {Object.entries(articles).length === 0 && (
        <p className="text-stone-600 text-3xl text-center">
          Aktuell keine geladenen Beiträge
        </p>
      )}
      {Object.entries(articles)
        .reverse()
        .map(([slug, [status, article]]) => (
          <Card
            key={slug}
            className="flex gap-2 p-4 font-condensed items-center cursor-pointer"
            onClick={() => setPath(slug)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={article?.title} src={article?.image} className="h-20" />
            <div>
              <p className="text-sm uppercase text-stone-500">{status}</p>
              <h3 className="text-xl font-bold mt-3">{article?.title}</h3>
              <p className="font-mono text-sm text-stone-500">{slug}</p>
            </div>
          </Card>
        ))}
    </div>
  );
};
