import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from '@mui/material';
import { getTrainerProfits, getPoolProfit } from '../services/api';
import type { TrainerProfit, ApiErrorResponse, PoolProfit } from '../types/api';

export const TrainerProfits = () => {
  const [profits, setProfits] = useState<TrainerProfit[]>([]);
  const [poolProfit, setPoolProfit] = useState<PoolProfit | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profitsResponse, poolProfitResponse] = await Promise.all([
          getTrainerProfits(),
          getPoolProfit()
        ]);
        setProfits(profitsResponse.profits);
        setPoolProfit(poolProfitResponse.pool);
        setError('');
      } catch (err) {
        const error = err as ApiErrorResponse;
        if (error.error) {
          setError(typeof error.error === 'string' ? error.error : Object.values(error.error)[0]);
        } else {
          setError('Произошла ошибка при загрузке статистики');
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

  const totalProfit = profits.reduce((sum, trainer) => sum + trainer.profit, 0);

  return (
    <Container>
      <Typography variant="h5" component="h2" gutterBottom>
        Статистика прибыли
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Общая прибыль: {totalProfit.toLocaleString('ru-RU')} ₽
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {poolProfit && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Самый прибыльный бассейн
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {poolProfit.pool.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {poolProfit.pool.address} • {poolProfit.pool.type}
                </Typography>
                <Typography variant="h6" color="primary">
                  {poolProfit.profit.toLocaleString('ru-RU')} ₽
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
      <Typography variant="h6" gutterBottom>
        Прибыль по тренерам
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Тренер</TableCell>
              <TableCell>Бассейн</TableCell>
              <TableCell align="right">Прибыль</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profits.map((trainer) => (
              <TableRow key={trainer.id}>
                <TableCell>{trainer.full_name}</TableCell>
                <TableCell>{trainer.pool_name}</TableCell>
                <TableCell align="right">
                  {trainer.profit.toLocaleString('ru-RU')} ₽
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}; 