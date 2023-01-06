import { CssBaseline, Stack } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Navigation } from './Navigation';
import { Workplace } from './Workplace';

const cardatronTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={cardatronTheme}>
      <CssBaseline />
      <Stack direction="row" sx={{ height: '100vh' }} justifyContent="stretch">
        <Navigation />
        <Workplace />
      </Stack>
    </ThemeProvider>
  );
}

export default App;
