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
import dayjs, { locale } from 'dayjs';
import { useCurrentArticle, useEditor } from './logic/editor';
import { Logo } from './Logo';
import { Article } from './logic/types';

locale('de');

export const EditorModuleEditor: FC = () => {
  const { relativePath } = useEditor();
  const { isEmpty, currentArticle, changeCurrentArticle, saveCurrentArticle } =
    useCurrentArticle();

  console.log((currentArticle as Article).slug);

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
            <Button
              disabled={isEmpty || !(currentArticle as Article).isDirty}
              variant="contained"
              sx={{ ml: 1 }}
              onClick={saveCurrentArticle}
            >
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
              onChange={(date) =>
                changeCurrentArticle((article) => {
                  article.date = (date ?? new Date()).toString();
                  return article;
                })
              }
              renderInput={(params) => <TextField {...params} />}
            />
            <TextField
              label="Titel"
              value={currentArticle.title}
              onChange={(ev) =>
                changeCurrentArticle((article) => {
                  article.title = ev.target.value;
                  return article;
                })
              }
            />
            <TextField
              label="Slug"
              value={currentArticle.slug}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ fontSize: '80%' }}>
                    {dayjs(currentArticle.date).format('YYYY/MM')}
                  </InputAdornment>
                ),
              }}
              onChange={(ev) =>
                changeCurrentArticle((article) => {
                  article.slug = ev.target.value;
                  return article;
                })
              }
            />
            <TextField
              label="Untertitel"
              value={currentArticle.subTitle}
              onChange={(ev) =>
                changeCurrentArticle((article) => {
                  article.subTitle = ev.target.value;
                  return article;
                })
              }
            />
            <TextField
              label="SEO-Titel"
              value={currentArticle.seoTitle}
              onChange={(ev) =>
                changeCurrentArticle((article) => {
                  article.seoTitle = ev.target.value;
                  return article;
                })
              }
            />
            <TextField
              label="Social-Media-Titel"
              value={currentArticle.ogTitle}
              onChange={(ev) =>
                changeCurrentArticle((article) => {
                  article.ogTitle = ev.target.value;
                  return article;
                })
              }
            />
            <TextField
              multiline
              label="Description"
              value={currentArticle.description}
              onChange={(ev) =>
                changeCurrentArticle((article) => {
                  article.description = ev.target.value;
                  return article;
                })
              }
            />
            <TextField
              multiline
              label="Excerpt"
              value={currentArticle.excerpt}
              onChange={(ev) =>
                changeCurrentArticle((article) => {
                  article.excerpt = ev.target.value;
                  return article;
                })
              }
            />
            <Box sx={{ py: 4 }}>
              <Editor
                value={currentArticle.body}
                onValueChange={(code) => {
                  changeCurrentArticle((article) => {
                    article.body = code;
                    return article;
                  });
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
            <TextField
              label="Bild"
              value={currentArticle.image}
              onChange={(ev) =>
                changeCurrentArticle((article) => {
                  article.image = ev.target.value;
                  return article;
                })
              }
            />
            <TextField
              label="Bild Copyright"
              value={currentArticle.imageCopyright}
              onChange={(ev) =>
                changeCurrentArticle((article) => {
                  article.imageCopyright = ev.target.value;
                  return article;
                })
              }
            />
            <TextField
              label="Social-Media-Bild"
              value={currentArticle.ogImage}
              onChange={(ev) =>
                changeCurrentArticle((article) => {
                  article.ogImage = ev.target.value;
                  return article;
                })
              }
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
