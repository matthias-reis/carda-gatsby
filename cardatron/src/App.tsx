import { CssBaseline, Stack } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Navigation } from './Navigation';
import { WorkplaceLeft, WorkplaceRight } from './Workplace';
import { useAddMessage } from './logic/messages';
import { useEffect } from 'react';
import { useRoute } from './logic/route';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

dayjs.locale('de');

const cardatronTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#96c6a7' },
  },
});

function App() {
  const addMessage = useAddMessage();
  const { setLeftRoute, setRightRoute } = useRoute();

  useEffect(() => {
    addMessage('app', 'start');
    setLeftRoute('splash');
    setRightRoute('viewer');
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={cardatronTheme}>
        <CssBaseline />
        <Stack
          direction="row"
          sx={{ height: '100vh' }}
          justifyContent="stretch"
        >
          <Navigation />
          <WorkplaceLeft />
          <WorkplaceRight />
        </Stack>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
