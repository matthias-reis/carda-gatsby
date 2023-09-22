import { CssBaseline, Stack } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Navigation } from './Navigation';
import { WorkplaceLeft, WorkplaceRight } from './Workplace';

const cardatronTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#96c6a7' },
  },
});

function App() {
  return (
    <ThemeProvider theme={cardatronTheme}>
      <CssBaseline />
      <Stack direction="row" sx={{ height: '100vh' }} justifyContent="stretch">
        <Navigation />
        <WorkplaceLeft />
        <WorkplaceRight />
      </Stack>
    </ThemeProvider>
  );
}

export default App;
