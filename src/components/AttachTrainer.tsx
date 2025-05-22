import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
} from '@mui/material';
import { getTrainers, getPools, attachTrainerToPool } from '../services/api';
import type { User, Pool, ApiErrorResponse } from '../types/api';

export const AttachTrainer = () => {
  const [trainers, setTrainers] = useState<User[]>([]);
  const [pools, setPools] = useState<Pool[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<number>('');
  const [selectedPool, setSelectedPool] = useState<number>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trainersResponse, poolsResponse] = await Promise.all([
          getTrainers(),
          getPools()
        ]);
        setTrainers(trainersResponse.trainers);
        setPools(poolsResponse.pools);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedTrainer || !selectedPool) {
      setError('Пожалуйста, выберите тренера и бассейн');
      return;
    }

    try {
      await attachTrainerToPool({
        user_id: selectedTrainer,
        pool_id: selectedPool
      });
      setSuccess('Тренер успешно прикреплен к бассейну');
      setSelectedTrainer('');
      setSelectedPool('');
    } catch (err) {
      const error = err as ApiErrorResponse;
      if (error.error) {
        setError(typeof error.error === 'string' ? error.error : Object.values(error.error)[0]);
      } else {
        setError('Произошла ошибка при прикреплении тренера');
      }
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
      <Typography variant="h5" component="h2" gutterBottom>
        Прикрепление тренера к бассейну
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Тренер</InputLabel>
                  <Select
                    value={selectedTrainer}
                    label="Тренер"
                    onChange={(e) => setSelectedTrainer(e.target.value)}
                  >
                    {trainers.map((trainer) => (
                      <MenuItem key={trainer.id} value={trainer.id}>
                        {trainer.full_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Бассейн</InputLabel>
                  <Select
                    value={selectedPool}
                    label="Бассейн"
                    onChange={(e) => setSelectedPool(e.target.value)}
                  >
                    {pools.map((pool) => (
                      <MenuItem key={pool.id} value={pool.id}>
                        {pool.name} ({pool.address})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Прикрепить тренера
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}; 