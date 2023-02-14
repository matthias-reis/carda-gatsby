import { KeyboardDoubleArrowRight } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { EditorSyntax } from './EditorSyntax';
import hl from 'highlight.js';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { locale } from 'dayjs';
import { useCurrentArticle, useEditor } from './logic/editor';
import { Logo } from './Logo';

locale('de');

export const EditorModuleEditor: FC = () => {
  const { relativePath, slugPath, slugIdentifier } = useEditor();
  const { currentArticle } = useCurrentArticle();
  const [code, setCode] = useState(
    typeof currentArticle === 'string' ? '' : currentArticle.body
  );

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
        {typeof currentArticle === 'string' ? (
          <Stack alignItems="center" sx={{ textAlign: 'center' }}>
            <Logo width={256} height={256} />
            <Typography variant="h5" sx={{ opacity: 0.5, fontWeight: 'bold' }}>
              {currentArticle}
            </Typography>
          </Stack>
        ) : (
          <Stack gap={2} sx={{ p: 2, flex: '1 1 auto', overflowY: 'scroll' }}>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Datei: {relativePath}
            </Typography>
            <Typography variant="h3" sx={{ mb: 5 }}>
              {currentArticle.title}
            </Typography>
            <DatePicker
              label="Datum"
              value={currentArticle.date}
              onChange={() => {}}
              renderInput={(params) => <TextField {...params} />}
            />
            <TextField label="Titel" value={currentArticle.title} />
            <TextField
              label="Slug"
              value={slugIdentifier}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ fontSize: '80%' }}>
                    {slugPath}
                  </InputAdornment>
                ),
              }}
            />
            <TextField label="Untertitel" value={currentArticle.subTitle} />
            <TextField label="SEO-Titel" value={currentArticle.seoTitle} />
            <TextField
              label="Social-Media-Titel"
              value={currentArticle.ogTitle}
            />
            <TextField
              multiline
              label="Description"
              value={currentArticle.description}
            />
            <TextField
              multiline
              label="Excerpt"
              value={currentArticle.excerpt}
            />
            <Box sx={{ py: 4 }}>
              <Editor
                value={currentArticle.body}
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
            <TextField label="Bild" value={currentArticle.image} />
            <TextField
              label="Bild Copyright"
              value={currentArticle.imageCopyright}
            />
            <TextField
              label="Social-Media-Bild"
              value={currentArticle.ogImage}
            />
            <Stack direction="row" gap={2}>
              {currentArticle.labels.map((label) => (
                <Chip label={label} />
              ))}
            </Stack>
            <ToggleButtonGroup>
              <ToggleButton value="advertisement">Werbung</ToggleButton>
              <ToggleButton value="affiliate">Affiliate</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        )}
      </Stack>
    </LocalizationProvider>
  );
};
