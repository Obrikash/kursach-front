import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Alert,
  Avatar,
  Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { getUserProfile, getUserSubscriptions } from '../services/api';
import type { User, UserSubscription, ApiErrorResponse } from '../types/api';

const getRoleName = (roleId: number): string => {
  switch (roleId) {
    case 1:
      return 'Тренер';
    case 2:
      return 'Пользователь';
    case 3:
      return 'Администратор';
    default:
      return 'Неизвестная роль';
  }
};

export const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, subscriptionsResponse] = await Promise.all([
          getUserProfile(),
          getUserSubscriptions(),
        ]);
        setUser(userResponse.user);
        setSubscriptions(subscriptionsResponse.user_subscriptions);
        setError('');
      } catch (err) {
        const error = err as ApiErrorResponse;
        if (error.error) {
          setError(typeof error.error === 'string' ? error.error : Object.values(error.error)[0]);
        } else {
          setError('Произошла ошибка при загрузке данных');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container>
        <Typography align="center">Загрузка...</Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Alert severity="error">Не удалось загрузить данные пользователя</Alert>
      </Container>
    );
  }

  const getRoleColor = (roleId: number): "primary" | "secondary" | "default" => {
    switch (roleId) {
      case 1:
        return "primary";
      case 2:
        return "default";
      case 3:
        return "secondary";
      default:
        return "default";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Container>
      <Typography variant="h5" component="h2" gutterBottom>
        Профиль пользователя
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  src={user.image_url}
                  alt={user.full_name}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Chip
                  label={getRoleName(user.role_id)}
                  color={getRoleColor(user.role_id)}
                  sx={{ mb: 1 }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  {user.full_name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Email: {user.email}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Дата регистрации: {new Date(user.created_at).toLocaleDateString('ru-RU')}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Мои абонементы
        </Typography>
        {subscriptions.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            У вас пока нет активных абонементов
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Название</TableCell>
                  <TableCell>Посещений в неделю</TableCell>
                  <TableCell>Цена</TableCell>
                  <TableCell>Дата начала</TableCell>
                  <TableCell>Дата окончания</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subscriptions.map((subscription) => (
                  <TableRow key={subscription.sub_id}>
                    <TableCell>{subscription.sub_name}</TableCell>
                    <TableCell>{subscription.visits_per_week}</TableCell>
                    <TableCell>{subscription.price} ₽</TableCell>
                    <TableCell>{formatDate(subscription.date_start)}</TableCell>
                    <TableCell>{formatDate(subscription.date_end)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
}; 