import { FC } from 'react';
import { Article } from './types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
        <TabsContent value="meta">Metadata</TabsContent>
        <TabsContent value="text">Text</TabsContent>
      </Tabs>
    </div>
  );
};
