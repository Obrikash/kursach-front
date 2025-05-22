import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Alert,
  Chip,
} from '@mui/material';
import { getPools } from '../services/api';
import type { Pool, ApiErrorResponse } from '../types/api';

export const PoolsList = () => {
  const [pools, setPools] = useState<Pool[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPools = async () => {
      try {
        const response = await getPools();
        setPools(response.pools);
        setError('');
      } catch (err) {
        const error = err as ApiErrorResponse;
        if (error.error) {
          setError(typeof error.error === 'string' ? error.error : Object.values(error.error)[0]);
        } else {
          setError('Произошла ошибка при загрузке бассейнов');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPools();
  }, []);

  const getPoolTypeColor = (type: string) => {
    switch (type) {
      case 'Спортивный':
        return 'primary';
      case 'Оздоровительный':
        return 'success';
      case 'Комбинированный':
        return 'secondary';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography align="center">Загрузка...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Grid container spacing={3}>
        {pools.map((pool) => (
          <Grid item xs={12} sm={6} md={4} key={pool.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {pool.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {pool.address}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip
                    label={pool.type}
                    color={getPoolTypeColor(pool.type) as any}
                    size="small"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}; 