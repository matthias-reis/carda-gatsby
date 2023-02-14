import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { FC, useEffect, useRef } from 'react';

export const EditorModule: FC = () => {
  const previewEl = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (previewEl.current) {
      const iFrame = previewEl.current;
      console.log(iFrame);
      iFrame.addEventListener(
        'message',
        (...attrs) => console.log('outside iframe', attrs),
        false
      );
    }
  }, [previewEl]);
  return (
    <Stack direction="row">
      <Box
        sx={{
          flex: '3 0 auto',
          borderRight: '1px solid grey',
          minHeight: '100vh',
        }}
      >
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Editor
            </Typography>
            <Button variant="contained" sx={{ ml: 1 }}>
              Speichern
            </Button>
            <Button variant="outlined" sx={{ ml: 1 }}>
              Deployen
            </Button>
            <IconButton sx={{ ml: 4 }}>
              <KeyboardDoubleArrowRight />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box>Hallo</Box>
      </Box>
      <Box sx={{ flex: '4 0 auto' }}>
        <AppBar position="sticky" sx={{ flex: '0 0 auto' }}>
          <Toolbar>
            <IconButton sx={{ mm: 4 }}>
              <KeyboardDoubleArrowLeft />
            </IconButton>
            <TextField
              disabled
              size="small"
              value="https://cardamonchai.com"
              sx={{
                ml: 3,
                mr: 3,
                pd: 1,
                flex: '1 1 auto',
              }}
            />
          </Toolbar>
        </AppBar>
        <Box sx={{ position: 'relative', height: '100%' }}>
          <iframe
            src="http://localhost:8000"
            ref={previewEl}
            onClick={console.log}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              border: 0,
            }}
          />
        </Box>
      </Box>
    </Stack>
  );
};
