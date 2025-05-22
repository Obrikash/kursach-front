import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Alert,
  Box,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { getSubscriptions } from '../services/api';
import type { Subscription, ApiErrorResponse } from '../types/api';

export const SubscriptionsList = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await getSubscriptions();
        setSubscriptions(response.subscriptions);
        setError('');
      } catch (err) {
        const error = err as ApiErrorResponse;
        if (error.error) {
          setError(typeof error.error === 'string' ? error.error : Object.values(error.error)[0]);
        } else {
          setError('Произошла ошибка при загрузке абонементов');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  if (loading) {
    return (
      <Container>
        <Typography align="center">Загрузка...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h5" component="h2" gutterBottom>
        Доступные абонементы
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Alert severity="info" sx={{ mb: 3 }}>
        Информация о ваших активных абонементах доступна в{' '}
        <Link component={RouterLink} to="/profile">
          профиле пользователя
        </Link>
      </Alert>

      <Grid container spacing={3}>
        {subscriptions.map((subscription) => (
          <Grid item xs={12} sm={6} md={3} key={subscription.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {subscription.name}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" color="text.secondary">
                    Посещений в неделю: {subscription.visits_per_week}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    {subscription.price} ₽
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}; 