import { FC } from 'react';
import {
  type MDXEditorProps,
  MDXEditor,
  headingsPlugin,
  diffSourcePlugin,
  quotePlugin,
  thematicBreakPlugin,
  imagePlugin,
  jsxPlugin,
  linkPlugin,
  tablePlugin,
  toolbarPlugin,
  linkDialogPlugin,
  markdownShortcutPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  listsPlugin,
  DiffSourceToggleWrapper,
  CreateLink,
  InsertImage,
  GenericJsxEditor,
  InsertTable,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

export const EditorEngine: FC<MDXEditorProps> = (props) => (
  <MDXEditor
    contentEditableClassName="editor"
    plugins={[
      headingsPlugin(),
      listsPlugin(),
      quotePlugin(),
      diffSourcePlugin({ viewMode: 'rich-text' }),
      thematicBreakPlugin(),
      imagePlugin(),
      linkPlugin(),
      linkDialogPlugin(),
      tablePlugin(),
      toolbarPlugin({
        toolbarContents: () => (
          <>
            <DiffSourceToggleWrapper options={['rich-text', 'source']}>
              <CreateLink />
              <InsertImage />
              <InsertTable />
            </DiffSourceToggleWrapper>
          </>
        ),
      }),
      jsxPlugin({
        jsxComponentDescriptors: [
          {
            name: 'YouTube',
            kind: 'flow',
            props: [{ name: 'id', type: 'string' }],
            Editor: GenericJsxEditor,
          },
          {
            name: 'Gallery',
            kind: 'flow',
            props: [{ name: 'name', type: 'string' }],
            Editor: GenericJsxEditor,
          },
        ],
      }),
      markdownShortcutPlugin(),
    ]}
    {...props}
  />
);
