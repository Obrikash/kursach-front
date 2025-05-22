import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
} from '@mui/material';
import { loginUser } from '../services/api';
import type { ApiErrorResponse } from '../types/api';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const translateError = (errorMessage: string): string => {
    const errorTranslations: { [key: string]: string } = {
      'invalid credentials': 'Неверный email или пароль',
      'must be at 8 bytes long': 'Пароль должен содержать минимум 8 символов',
      'you must be authenticated to access this resource': 'Необходима авторизация для доступа к ресурсу',
    };
    return errorTranslations[errorMessage] || errorMessage;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await loginUser(formData);
      setSuccess('Вход выполнен успешно!');
      localStorage.setItem('token', response.authentication_token);
      setFormData({
        email: '',
        password: '',
      });
      onLoginSuccess();
    } catch (err) {
      const error = err as ApiErrorResponse;
      if (error.error) {
        const errorMessage = typeof error.error === 'string' ? error.error : Object.values(error.error)[0];
        setError(translateError(errorMessage));
      } else {
        setError('Произошла ошибка при входе');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Вход в систему
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </Button>
        </Box>
      </Box>
    </Container>
  );
}; 