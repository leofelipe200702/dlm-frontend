import React, { useState } from 'react';
import AuthService from '../services/auth.service';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// Importando componentes do MUI
import { TextField, Button, Box, Typography, Container, Alert, Paper, Grid } from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setSuccessful(false);

    try {
      // Chama o serviço de registro
      await AuthService.register(username, email, password); 
      
      setMessage('Registro realizado com sucesso! Você será redirecionado para o Login.');
      setSuccessful(true);
      
      // Navega automaticamente para o login após 2 segundos
      setTimeout(() => navigate('/login'), 2000); 

    } catch (error) {
      // Captura e exibe a mensagem de erro detalhada do Backend
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setMessage(resMessage || "Erro durante o registro.");
      setSuccessful(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Criar Nova Conta
        </Typography>

        <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            
            {/* Campo Usuário */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Usuário"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>

            {/* Campo Email */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            
            {/* Campo Senha */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            
          </Grid>
          
          {/* Botão de Envio */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success" // Cor de sucesso para Registro
            sx={{ mt: 3, mb: 2 }}
            disabled={successful} // Desabilita o botão após o sucesso para evitar envios duplicados
          >
            Registrar
          </Button>

        </Box>
        
        {/* Mensagens de Feedback */}
        {message && (
          <Alert severity={successful ? "success" : "error"} sx={{ width: '100%', mt: 2 }}>
            {message}
          </Alert>
        )}

        <Typography variant="body2" sx={{ mt: 2 }}>
          Já tem conta? 
          <RouterLink to="/login" style={{ textDecoration: 'none', marginLeft: '5px' }}>
            Faça Login
          </RouterLink>
        </Typography>

      </Paper>
    </Container>
  );
};

export default Register;