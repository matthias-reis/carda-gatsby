import {
  AppBar,
  Button,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { slugify } from './logic/articles';
import { useNewArticle } from './logic/editor';

export const NewModule: FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [title, setTitle] = useState<string>('');
  const { createArticle } = useNewArticle();
  return (
    <>
      {' '}
      <AppBar position="sticky" sx={{ flex: '0 0 auto' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Neuer Beitrag
          </Typography>
        </Toolbar>
      </AppBar>
      <Stack spacing={3} sx={{ p: 4 }}>
        <Typography variant="body1">
          Vergib einen Titel und das geplante Veröffentlichungsdatum, um einen
          neuen Beitrag anzulegen.
        </Typography>
        <Typography variant="body1">
          Für weitere Details wirst Du anschließend auf den Editor
          weitergeleitet.
        </Typography>
        <DatePicker
          label="Datum"
          value={date}
          onChange={(newDate) => newDate && setDate(newDate)}
          renderInput={(params) => <TextField {...params} />}
        />
        <TextField
          label="Titel"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <Typography variant="body1" sx={{ opacity: 0.5 }}>
          Neuer Artikel wird angelegt unter:
          <strong>
            <pre>
              ./content/articles/{dayjs(date).format('YYYY/MM')}/
              {slugify(title)}
              .md
            </pre>
          </strong>
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            createArticle(title, date);
          }}
        >
          Jetzt anlegen!
        </Button>
      </Stack>
    </>
  );
};
