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
} from '@mui/material';
import { getTrainerProfits } from '../services/api';
import type { TrainerProfit, ApiErrorResponse } from '../types/api';

export const TrainerProfits = () => {
  const [profits, setProfits] = useState<TrainerProfit[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfits = async () => {
      try {
        const response = await getTrainerProfits();
        setProfits(response.profits);
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

    fetchProfits();
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
        Статистика прибыли тренеров
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Общая прибыль: {totalProfit.toLocaleString('ru-RU')} ₽
          </Typography>
        </CardContent>
      </Card>
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