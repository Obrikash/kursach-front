import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface NavigationProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  userRole?: number;
}

export const Navigation = ({ isAuthenticated, onLogout, userRole }: NavigationProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Система управления бассейнами
        </Typography>
        {isAuthenticated ? (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/pools"
            >
              Бассейны
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/trainers"
            >
              Тренеры
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/pool-trainers"
            >
              Тренеры по бассейнам
            </Button>
            {userRole === 3 && (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/statistics"
                >
                  Статистика
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/attach-trainer"
                >
                  Прикрепить тренера
                </Button>
              </>
            )}
            <Button
              color="inherit"
              component={RouterLink}
              to="/profile"
            >
              Профиль
            </Button>
            <Button
              color="inherit"
              onClick={onLogout}
            >
              Выйти
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/login"
            >
              Войти
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/register"
            >
              Регистрация
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}; 