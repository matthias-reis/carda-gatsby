import { Field } from '@/components/field';
import { Card } from '@/components/ui/card';
import { FC, useState } from 'react';
import { slugify, useNewArticle } from './new-data';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/datepicker';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

export const NewPanel: FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [title, setTitle] = useState<string>('');
  const [language, setLanguage] = useState<'de' | 'en'>('de');

  const { createArticle } = useNewArticle();

  const fullSlug = `/${format(date, 'yyyy-MM')}/${slugify(title)}-${language}/`;

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-3 p-5">
      <h2 className="text-2xl font-condensed">Neuer Beitrag</h2>
      <p className="text-stone-400">
        Erstelle einen neuen Beitrag, indem du den Titel und das Datum ausfüllst
        und die Sprache wählst. Die Datei wird unter dem ermittelten Pfad
        automatisch generiert.
      </p>
      <p className="text-stone-400">
        Danach erhältst Du die Möglichkeit, den Beitrag weiter zu bearbeiten und
        ggf. nochmal zu verschieben.
      </p>
      <Card className="p-3 flex flex-col gap-1 mb-6">
        <Field label="Titel">
          <Input
            id="Title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </Field>
        <Field label="Datum">
          <DatePicker
            id="Datum"
            value={date}
            onChange={(date: Date | undefined) => {
              if (!date) return;
              setDate(date);
            }}
          />
        </Field>
        <Field label="Sprache">
          <ToggleGroup
            className="justify-start"
            type="single"
            value={language}
            onValueChange={(language: 'de' | 'en') => setLanguage(language)}
          >
            <ToggleGroupItem value="de">🇩🇪</ToggleGroupItem>
            <ToggleGroupItem value="en">🇬🇧</ToggleGroupItem>
          </ToggleGroup>
        </Field>
        <div className="text-right text-sm text-stone-400 mb-10">
          <div className="text-stone-600 text-xs">
            So wird der Pfad aussehen:
          </div>
          <pre
            title={fullSlug}
            className="text-sm text-stone-400 text-ellipsis overflow-hidden"
          >
            {fullSlug}
          </pre>
        </div>
        <Button
          onClick={() => {
            createArticle(title, date, language);
          }}
        >
          Jetzt anlegen!
        </Button>
      </Card>
    </div>
  );
};
