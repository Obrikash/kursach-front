import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import { RegisterForm } from './components/RegisterForm';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 2 }}>
        <h1>Swimming Pool Management System</h1>
        <RegisterForm />
      </Box>
    </ThemeProvider>
  );
}

export default App;
