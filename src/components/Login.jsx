import React, { useState } from 'react';
import AuthService from '../services/auth.service';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// Importando componentes do MUI
import { TextField, Button, Box, Typography, Container, Alert, Paper } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await AuthService.login(username, password);
      
      // Redirecionamento após login bem-sucedido
      navigate('/dashboard'); 
      window.location.reload(); 
    } catch (error) {
      // Trata erros do backend (ex: 401 Unauthorized)
      const resMessage =
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      setMessage("Falha no Login. Verifique suas credenciais. " + resMessage); 
      console.error(error.response || error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Acesso ao Sistema
        </Typography>

        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          
          {/* Componente TextField substitui o <input> e o <label> */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Usuário"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Botão de Envio */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
        </Box>
        
        {/* Mensagens de Feedback */}
        {message && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {message}
          </Alert>
        )}

        <Typography variant="body2" sx={{ mt: 2 }}>
          Não tem conta? 
          <RouterLink to="/register" style={{ textDecoration: 'none', marginLeft: '5px' }}>
            Registre-se
          </RouterLink>
        </Typography>

      </Paper>
    </Container>
  );
};

export default Login;