import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Alert,
  Avatar,
  Divider,
} from '@mui/material';
import { getPoolTrainers } from '../services/api';
import type { PoolTrainers, ApiErrorResponse } from '../types/api';

export const PoolTrainersList = () => {
  const [poolTrainers, setPoolTrainers] = useState<PoolTrainers[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoolTrainers = async () => {
      try {
        const response = await getPoolTrainers();
        setPoolTrainers(response.trainers_for_pools);
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

    fetchPoolTrainers();
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
        Тренеры по бассейнам
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Grid container spacing={3}>
        {poolTrainers.map(({ pool, trainers }) => (
          <Grid item xs={12} key={pool.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {pool.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {pool.address} • {pool.type}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Тренеры:
                </Typography>
                <Grid container spacing={2}>
                  {trainers.map((trainer) => (
                    <Grid item xs={12} sm={6} md={4} key={trainer.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={trainer.image_url}
                          alt={trainer.full_name}
                          sx={{ width: 40, height: 40, mr: 2 }}
                        />
                        <Box>
                          <Typography variant="body1">
                            {trainer.full_name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {trainer.email}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}; 