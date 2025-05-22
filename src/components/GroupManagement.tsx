import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { createGroup, getGroups, getPools, getTrainers } from '../services/api';
import type { Pool, User, Group, ApiErrorResponse } from '../types/api';

export const GroupManagement = () => {
  const [pools, setPools] = useState<Pool[]>([]);
  const [trainers, setTrainers] = useState<User[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedPool, setSelectedPool] = useState<number | ''>('');
  const [selectedTrainer, setSelectedTrainer] = useState<number | ''>('');
  const [selectedCategory, setSelectedCategory] = useState<number | ''>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 1, name: 'начинающие' },
    { id: 2, name: 'взрослые' },
    { id: 3, name: 'подростки' },
    { id: 4, name: 'спортсмены' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [poolsResponse, trainersResponse, groupsResponse] = await Promise.all([
          getPools(),
          getTrainers(),
          getGroups(),
        ]);
        setPools(poolsResponse.pools);
        setTrainers(trainersResponse.trainers);
        setGroups(groupsResponse.groups);
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

    if (!selectedPool || !selectedTrainer || !selectedCategory) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    try {
      await createGroup({
        pool_id: selectedPool,
        trainer_id: selectedTrainer,
        category_id: selectedCategory,
      });
      setSuccess('Группа успешно создана');
      // Refresh groups list
      const groupsResponse = await getGroups();
      setGroups(groupsResponse.groups);
      // Reset form
      setSelectedPool('');
      setSelectedTrainer('');
      setSelectedCategory('');
    } catch (err) {
      const error = err as ApiErrorResponse;
      if (error.error) {
        setError(typeof error.error === 'string' ? error.error : Object.values(error.error)[0]);
      } else {
        setError('Произошла ошибка при создании группы');
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
        Управление группами
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Создать новую группу
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Бассейн</InputLabel>
            <Select
              value={selectedPool}
              label="Бассейн"
              onChange={(e) => setSelectedPool(e.target.value as number)}
            >
              {pools.map((pool) => (
                <MenuItem key={pool.id} value={pool.id}>
                  {pool.name} - {pool.address}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Тренер</InputLabel>
            <Select
              value={selectedTrainer}
              label="Тренер"
              onChange={(e) => setSelectedTrainer(e.target.value as number)}
            >
              {trainers.map((trainer) => (
                <MenuItem key={trainer.id} value={trainer.id}>
                  {trainer.full_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Категория</InputLabel>
            <Select
              value={selectedCategory}
              label="Категория"
              onChange={(e) => setSelectedCategory(e.target.value as number)}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            Создать группу
          </Button>
        </Box>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Существующие группы
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Бассейн</TableCell>
              <TableCell>Тренер</TableCell>
              <TableCell>Категория</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.id}</TableCell>
                <TableCell>{group.pool_name}</TableCell>
                <TableCell>{group.trainer_name}</TableCell>
                <TableCell>{group.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}; 