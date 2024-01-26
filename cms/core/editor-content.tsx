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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export const EditorContent: FC<{
  article: Article;
  change: (changeFn: (a: Article) => Article) => void;
}> = ({ article, change }) => {
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
                <Input
                  id="Slug"
                  value={article.slug}
                  onChange={(ev) => {
                    const slug = ev.target.value;
                    change((a: Article) => ({ ...a, slug }));
                  }}
                />
              </Field>

              <Field label="Datum">
                <DatePicker
                  id="Datum"
                  value={new Date(article.date)}
                  onChange={(date: Date | undefined) => {
                    if (!date) return;
                    change((a: Article) => ({
                      ...a,
                      date: date.toISOString(),
                    }));
                  }}
                />
              </Field>
              <div className="flex text-sm text-stone-400 justify-end gap-4">
                <div className="opacity-40">Neuer Pfad:</div>
                <pre className="text-sm text-stone-400">
                  /{format(new Date(article.date), 'yyyy-MM')}/{article.slug}/
                </pre>
              </div>
            </Card>
            <Field label="Titel">
              <Input
                id="Titel"
                value={article.title}
                onChange={(ev) => {
                  const title = ev.target.value;
                  change((a: Article) => ({ ...a, title }));
                }}
              />
            </Field>
            <Field label="Typ">
              <Textarea
                rows={2}
                id="Typ"
                value={article.typeName}
                onChange={(ev) => {
                  const typeName = ev.target.value;
                  change((a: Article) => ({ ...a, typeName }));
                }}
              />
            </Field>
            <Field label="Untertitel">
              <Textarea
                rows={2}
                id="Untertitel"
                value={article.subTitle}
                onChange={(ev) => {
                  const subTitle = ev.target.value;
                  change((a: Article) => ({ ...a, subTitle }));
                }}
              />
            </Field>
            <Field label="SEO-Titel">
              <Textarea
                rows={2}
                id="SEO-Titel"
                value={article.seoTitle}
                onChange={(ev) => {
                  const seoTitle = ev.target.value;
                  change((a: Article) => ({ ...a, seoTitle }));
                }}
              />
            </Field>
            <Field label="Social Titel">
              <Textarea
                rows={2}
                id="Social Titel"
                value={article.ogTitle}
                onChange={(ev) => {
                  const ogTitle = ev.target.value;
                  change((a: Article) => ({ ...a, ogTitle }));
                }}
                className="mb-6"
              />
            </Field>
            <Field label="Description">
              <Textarea
                id="Description"
                rows={6}
                value={article.description}
                onChange={(ev) => {
                  const description = ev.target.value;
                  change((a: Article) => ({ ...a, description }));
                }}
              />
            </Field>
            <Field label="Excerpt">
              <Textarea
                id="Excerpt"
                rows={6}
                className="mb-6"
                value={article.excerpt}
                onChange={(ev) => {
                  const excerpt = ev.target.value;
                  change((a: Article) => ({ ...a, excerpt }));
                }}
              />
            </Field>
            <Field label="Bild">
              <div className="flex gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.ogImage}
                  alt="Social Bild"
                  className="h-14 object-cover rounded"
                />
                <Input
                  id="Bild"
                  className="text-xs"
                  value={article.image}
                  onChange={(ev) => {
                    const image = ev.target.value;
                    change((a: Article) => ({ ...a, image }));
                  }}
                />
              </div>
            </Field>
            <Field label="Bild Copyright">
              <Input
                id="Bild Copyright"
                value={article.imageCopyright}
                onChange={(ev) => {
                  const imageCopyright = ev.target.value;
                  change((a: Article) => ({ ...a, imageCopyright }));
                }}
              />
            </Field>
            <Field label="Social Bild">
              <div className="flex gap-2 mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.ogImage}
                  alt="Social Bild"
                  className="h-14 object-cover rounded"
                />
                <Input
                  id="Social Bild"
                  className="text-xs "
                  value={article.ogImage}
                  onChange={(ev) => {
                    const ogImage = ev.target.value;
                    change((a: Article) => ({ ...a, ogImage }));
                  }}
                />
              </div>
            </Field>
            <Field label="Stichwörter">
              <TagCloud
                className="mb-6"
                value={article.labels}
                onChange={(labels) => {
                  change((a: Article) => ({ ...a, labels }));
                }}
              />
            </Field>
            <Field label="Werbung">
              <ToggleGroup
                type="multiple"
                variant="outline"
                onValueChange={(value) => {
                  change((a: Article) => ({
                    ...a,
                    advertisement: value.includes('ad'),
                    affiliate: value.includes('af'),
                    productsProvided: value.includes('pr'),
                  }));
                }}
                value={[
                  article.advertisement ? 'ad' : '',
                  article.affiliate ? 'af' : '',
                  article.productsProvided ? 'pr' : '',
                ].filter(Boolean)}
              >
                <ToggleGroupItem value="ad">Werbung</ToggleGroupItem>
                <ToggleGroupItem value="af">Affiliate</ToggleGroupItem>
                <ToggleGroupItem value="pr">Produkte bekommen</ToggleGroupItem>
              </ToggleGroup>
            </Field>
          </div>
        </TabsContent>
        <TabsContent value="text">Text</TabsContent>
      </Tabs>
    </div>
  );
};
