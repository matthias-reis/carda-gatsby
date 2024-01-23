import { KeyboardDoubleArrowLeft } from '@mui/icons-material';
import { AppBar, Box, IconButton, TextField, Toolbar } from '@mui/material';
import { FC, useEffect, useCallback, useRef } from 'react';
import { useEditor } from './logic/editor';
import { useViewerPath, useSetViewerPath } from './logic/viewer';
import { useAddMessage } from './logic/messages';
import { useRoute } from './logic/route';

export const ViewerModule: FC = () => {
  const previewEl = useRef<HTMLIFrameElement>(null);
  const { isEditable, path, url } = useViewerPath();
  const setPath = useSetViewerPath();
  const addMessage = useAddMessage();
  const { setLeftRoute } = useRoute();

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
    }

    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage, previewEl]);

  useEffect(() => {
    addMessage('viewer', `${isEditable ? 'editable path' : 'path'} <${path}>`);
  }, [path]);

  const { setSlug } = useEditor();

  const handleEdit = useCallback(() => {
    setSlug(path);
    setLeftRoute('editor');
    addMessage('viewer', `loading into editor <${path}>`);
  }, [path]);

  return (
    <Box sx={{ flex: '4 0 auto', height: '100vh' }}>
      <AppBar position="sticky" sx={{ flex: '0 0 auto' }}>
        <Toolbar>
          <IconButton
            sx={{ mm: 4 }}
            disabled={!isEditable}
            onClick={handleEdit}
          >
            <KeyboardDoubleArrowLeft />
          </IconButton>
          <TextField
            disabled
            size="small"
            value={url}
            sx={{
              ml: 3,
              mr: 3,
              pd: 1,
              flex: '1 1 auto',
            }}
          />
        </Toolbar>
      </AppBar>
      <Box sx={{ position: 'relative', height: 'calc(100% - 64px)' }}>
        <iframe
          src={url}
          ref={previewEl}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            border: 0,
          }}
        />
      </Box>
    </Box>
  );
};
