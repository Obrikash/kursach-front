import { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Box, Button, Typography } from '@mui/material';
import { RegisterForm } from './components/RegisterForm';
import { LoginForm } from './components/LoginForm';
import { PoolsList } from './components/PoolsList';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleRegisterSuccess = () => {
    setIsLogin(true);
  };

  if (isAuthenticated) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1">
              Система управления бассейнами
            </Typography>
            <Button variant="outlined" onClick={handleLogout}>
              Выйти
            </Button>
          </Box>
          <PoolsList />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Система управления бассейнами
        </Typography>
        {isLogin ? (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        ) : (
          <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
        )}
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button
            variant="text"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"}
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
