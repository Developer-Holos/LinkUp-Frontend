import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Afiliados from './pages/Afiliados/Afiliados';

const theme = createTheme({
  palette: {
    primary: {
      main: '#06b6d4',
    },
    secondary: {
      main: '#9333ea',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Afiliados />
    </ThemeProvider>
  );
}

export default App;