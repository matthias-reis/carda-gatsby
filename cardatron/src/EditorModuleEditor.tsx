import { KeyboardDoubleArrowRight } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  Stack,
  Tab,
  Tabs,
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
import { atom, useAtom } from 'jotai';

locale('de');

const tabAtom = atom<0 | 1>(0);

export const EditorModuleEditor: FC = () => {
  const { relativePath } = useEditor();
  const [tab, setTab] = useAtom(tabAtom);
  const { isEmpty, currentArticle, changeCurrentArticle, saveCurrentArticle } =
    useCurrentArticle();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <EditorSyntax />
      <Stack
        sx={{
          flex: '0 0 auto',
          borderRight: '1px solid grey',
          height: '100vh',
          width: '700px',
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
          <>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                flex: '0 0 auto',
              }}
            >
              <Tabs value={tab} onChange={(_, newTab) => setTab(newTab)}>
                <Tab value={0} label="Metadaten" />
                <Tab value={1} label="Text" />
              </Tabs>
            </Box>
            <Box
              display={tab === 0 ? 'block' : 'none'}
              sx={{
                flex: '1 1 auto',
                overflowY: 'scroll',
              }}
            >
              <Stack gap={2} sx={{ p: 2 }}>
                <Box>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Metadaten
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: '#96c6a7' }}
                  >
                    {currentArticle.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 5, opacity: 0.5 }}>
                    Datei: {relativePath}
                  </Typography>
                </Box>
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
                <Typography variant="h5">Tags</Typography>
                <Stack direction="row" flexWrap="wrap" gap={2}>
                  {currentArticle.labels.map((label) => (
                    <Chip label={label} />
                  ))}
                </Stack>
                <Typography variant="h5">Werbung</Typography>
                <ToggleButtonGroup
                  value={[
                    currentArticle.advertisement ? 'advertisement' : null,
                    currentArticle.affiliate ? 'affiliate' : null,
                    currentArticle.productsProvided ? 'productsProvided' : null,
                  ].filter(Boolean)}
                  onChange={(_, value: string[]) => {
                    changeCurrentArticle((article) => {
                      article.advertisement = value.includes('advertisement');
                      article.affiliate = value.includes('affiliate');
                      article.productsProvided =
                        value.includes('productsProvided');

                      return article;
                    });
                  }}
                >
                  <ToggleButton value="advertisement">Werbung</ToggleButton>
                  <ToggleButton value="affiliate">Affiliate</ToggleButton>
                  <ToggleButton value="productsProvided">
                    Produktplatzierung
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Box>
            <Box
              display={tab === 1 ? 'block' : 'none'}
              sx={{
                flex: '1 1 auto',
                overflowY: 'scroll',
                p: 2,
              }}
            >
              <Typography variant="body2" sx={{ mt: 2 }}>
                Texteditor
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: '#96c6a7' }}
              >
                {currentArticle.title}
              </Typography>
              <Typography variant="body2" sx={{ mb: 5, opacity: 0.5 }}>
                Datei: {relativePath}
              </Typography>
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
          </>
        )}
      </Stack>
    </LocalizationProvider>
  );
};
