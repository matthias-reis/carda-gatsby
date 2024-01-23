import { FC } from 'react';
import { Article } from './types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Field } from '@/components/field';
import { DatePicker } from '@/components/datepicker';
import { format } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { TagCloud } from '@/components/tag-cloud';
import { ToggleGroup, ToggleGroupItem } from '@radix-ui/react-toggle-group';

export const EditorContent: FC<{ article: Article }> = ({ article }) => {
  return (
    <div className="p-3 font-condensed">
      <Tabs defaultValue="meta">
        <TabsList className="w-full font-condensed">
          <TabsTrigger value="meta" className="font-condensed">
            Meta
          </TabsTrigger>
          <TabsTrigger value="text" className="font-condensed">
            Text [{article.language || 'de'}]
          </TabsTrigger>
        </TabsList>
        <TabsContent value="meta">
          <div className="max-w-xl mx-auto flex flex-col gap-1">
            <Card className="p-3 flex flex-col gap-1 mb-6">
              <Field label="Slug">
                <Input id="Slug" />
              </Field>

              <Field label="Datum">
                <DatePicker id="Datum" />
              </Field>
              <div className="flex text-sm text-stone-400 justify-end gap-4">
                <div className="opacity-40">Neuer Pfad:</div>
                <pre className="text-sm text-stone-400">
                  /{format(new Date(), 'yyyy-MM')}/{article.slug}/
                </pre>
              </div>
            </Card>
            <Field label="Titel">
              <Input id="Titel" />
            </Field>
            <Field label="Untertitel">
              <Input id="Untertitel" />
            </Field>
            <Field label="SEO-Titel">
              <Input id="SEO-Titel" />
            </Field>
            <Field label="Social Titel">
              <Input id="Social Titel" className="mb-6" />
            </Field>
            <Field label="Description">
              <Textarea id="Description" />
            </Field>
            <Field label="Excerpt">
              <Textarea id="Excerpt" className="mb-6" />
            </Field>
            <Field label="Bild">
              <Input id="Bild" />
            </Field>
            <Field label="Bild Copyright">
              <Input id="Bild Copyright" />
            </Field>
            <Field label="Social Bild">
              <Input id="Social Bild" className="mb-6" />
            </Field>
            <Field label="Tags">
              <TagCloud className="mb-6" />
            </Field>
            <Field label="Werbung">
              <ToggleGroup type="multiple">
                <ToggleGroupItem value="ad">Werbung</ToggleGroupItem>
                <ToggleGroupItem value="af">Affiliate</ToggleGroupItem>
                <ToggleGroupItem value="pr">Produktplatzierung</ToggleGroupItem>
              </ToggleGroup>
            </Field>
          </div>
        </TabsContent>
        <TabsContent value="text">Text</TabsContent>
      </Tabs>
    </div>
  );
};
