import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme, Box, Button, Typography } from '@mui/material';
import { RegisterForm } from './components/RegisterForm';
import { LoginForm } from './components/LoginForm';
import { PoolsList } from './components/PoolsList';
import { TrainersList } from './components/TrainersList';
import { PoolTrainersList } from './components/PoolTrainersList';
import { Navigation } from './components/Navigation';

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Container component="main" sx={{ mt: 4 }}>
          <Routes>
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <LoginForm onLoginSuccess={handleLoginSuccess} />
                ) : (
                  <Navigate to="/pools" replace />
                )
              }
            />
            <Route
              path="/register"
              element={
                !isAuthenticated ? (
                  <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
                ) : (
                  <Navigate to="/pools" replace />
                )
              }
            />
            <Route
              path="/pools"
              element={
                isAuthenticated ? (
                  <PoolsList />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/trainers"
              element={
                isAuthenticated ? (
                  <TrainersList />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/pool-trainers"
              element={
                isAuthenticated ? (
                  <PoolTrainersList />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="/" element={<Navigate to="/pools" replace />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
