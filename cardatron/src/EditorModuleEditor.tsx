import { KeyboardDoubleArrowRight } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  Stack,
  TextareaAutosize,
  TextField,
  TextFieldProps,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from '@mui/material';
import { FC, JSXElementConstructor, ReactElement, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { EditorSyntax } from './EditorSyntax';
import hl from 'highlight.js';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { locale } from 'dayjs';

locale('de');

export const EditorModuleEditor: FC = () => {
  const [code, setCode] = useState(`
# Headline 1

## Headline 2

Paragraph

- unordered
- list

1. ordered
2. list

[link text](/)

![alt text](/foo)

<Video blah="blu" />
  `);

  /* fields
  - Datum
  - slug
  - titel
  - untertitel
  - seotitel
  - social media titel
  - description
  - excerpt
  - text
  - en text
  - bild
    - url
    - copyright
  - social media bild
  - labels
  - werbung bool
  - affiliate bool
  */
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <EditorSyntax />
      <Stack
        sx={{
          flex: '0 0 auto',
          borderRight: '1px solid grey',
          height: '100vh',
          width: '640px',
        }}
      >
        <AppBar position="sticky" sx={{ flex: '0 0 auto' }}>
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
        <Stack gap={1} sx={{ p: 2, flex: '1 1 auto', overflowY: 'scroll' }}>
          <Typography variant="h3" sx={{ mt: 3, mb: 2 }}>
            Title of the article
          </Typography>
          <DatePicker
            label="Datum"
            value={new Date()}
            onChange={() => {}}
            renderInput={(params) => <TextField {...params} />}
          />
          <TextField label="Titel" />
          <TextField
            label="Slug"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ fontSize: '80%' }}>
                  /2023/02/
                </InputAdornment>
              ),
            }}
          />
          <TextField label="Untertitel" />
          <TextField label="SEO-Titel" />
          <TextField label="Social-Media-Titel" />
          <TextField multiline label="Description" />
          <TextField multiline label="Excerpt" />
          <Box sx={{ py: 4 }}>
            <Editor
              value={code}
              onValueChange={(code) => {
                // setCode(format(code, { parser: 'mdx', plugins: [prettierMd] }));
                setCode(code);
              }}
              padding={10}
              highlight={(code) => {
                const highlighted = hl.highlight(code, {
                  language: 'markdown',
                });
                return highlighted.value;
              }}
              className="hljs"
            />
          </Box>
          <TextField label="Bild" />
          <TextField label="Bild Copyright" />
          <TextField label="Social-Media-Bild" />
          <Stack direction="row" gap={2}>
            <Chip label="eins" />
            <Chip label="zwei" />
            <Chip label="drei" />
          </Stack>
          <ToggleButtonGroup>
            <ToggleButton value="advertisement">Werbung</ToggleButton>
            <ToggleButton value="affiliate">Affiliate</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
};
