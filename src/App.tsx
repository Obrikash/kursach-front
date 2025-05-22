import { useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Box, Button, Typography } from '@mui/material';
import { RegisterForm } from './components/RegisterForm';
import { LoginForm } from './components/LoginForm';

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
  const [isLogin, setIsLogin] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Swimming Pool Management System
        </Typography>
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button
            variant="text"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
