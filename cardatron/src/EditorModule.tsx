import { Stack } from '@mui/material';
import { FC } from 'react';
import { EditorModuleEditor } from './EditorModuleEditor';
import { EditorModuleViewer } from './EditorModuleViewer';

export const EditorModule: FC = () => {
  return (
    <Stack direction="row">
      <EditorModuleEditor />
      <EditorModuleViewer />
    </Stack>
  );
};
