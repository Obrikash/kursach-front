import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme, Box, Button, Typography } from '@mui/material';
import { RegisterForm } from './components/RegisterForm';
import { LoginForm } from './components/LoginForm';
import { PoolsList } from './components/PoolsList';
import { TrainersList } from './components/TrainersList';
import { PoolTrainersList } from './components/PoolTrainersList';
import { UserProfile } from './components/UserProfile';
import { TrainerProfits } from './components/TrainerProfits';
import { AttachTrainer } from './components/AttachTrainer';
import { SubscriptionsList } from './components/SubscriptionsList';
import { GroupManagement } from './components/GroupManagement';
import { Navigation } from './components/Navigation';
import { getUserProfile } from './services/api';
import type { User } from './types/api';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState<number | undefined>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Fetch user profile to get role
      getUserProfile()
        .then(response => {
          setUserRole(response.user.role_id);
        })
        .catch(() => {
          // If token is invalid, clear it
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserRole(undefined);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    // Fetch user profile to get role
    getUserProfile()
      .then(response => {
        setUserRole(response.user.role_id);
      });
  };

  const handleRegisterSuccess = () => {
    setIsLogin(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation 
          isAuthenticated={isAuthenticated} 
          onLogout={handleLogout}
          userRole={userRole}
        />
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
            <Route
              path="/subscriptions"
              element={
                isAuthenticated ? (
                  <SubscriptionsList />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/profile"
              element={
                isAuthenticated ? (
                  <UserProfile />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/statistics"
              element={
                isAuthenticated && userRole === 3 ? (
                  <TrainerProfits />
                ) : (
                  <Navigate to="/pools" replace />
                )
              }
            />
            <Route
              path="/attach-trainer"
              element={
                isAuthenticated && userRole === 3 ? (
                  <AttachTrainer />
                ) : (
                  <Navigate to="/pools" replace />
                )
              }
            />
            <Route
              path="/groups"
              element={
                isAuthenticated && userRole === 3 ? (
                  <GroupManagement />
                ) : (
                  <Navigate to="/pools" replace />
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
