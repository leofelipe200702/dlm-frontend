import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, CssBaseline, Container } from '@mui/material';
import { Outlet, Link as RouterLink, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const Layout = () => {
    const user = AuthService.getCurrentUser();
    const navigate = useNavigate();

    const logOut = () => {
        AuthService.logout();
        navigate('/login');
        window.location.reload();
    };

    return (
        // CssBaseline reseta o CSS para o padrão Material Design
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CssBaseline />
            
            {/* Barra de Navegação Superior (AppBar) */}
            <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
                <Toolbar>
                    <Typography 
                        variant="h6" 
                        noWrap 
                        component={RouterLink} 
                        to="/" 
                        sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}
                    >
                        📚 DLM - Gerenciador de Biblioteca
                    </Typography>

                    {user ? (
                        <Box>
                            <Typography variant="body1" component="span" sx={{ mr: 2 }}>
                                Olá, {user.username}!
                            </Typography>
                            <Button color="inherit" component={RouterLink} to="/dashboard">Dashboard</Button>
                            <Button color="inherit" onClick={logOut}>Sair</Button>
                        </Box>
                    ) : (
                        <Box>
                            <Button color="inherit" component={RouterLink} to="/login">Login</Button>
                            <Button color="inherit" component={RouterLink} to="/register">Registro</Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            {/* Conteúdo Principal (Onde as rotas serão renderizadas) */}
            <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
                {/* O Outlet é onde os componentes de rota (Login, Dashboard, etc.) serão injetados */}
                <Outlet />
            </Container>

            {/* Rodapé Simples (Opcional) */}
            <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', bgcolor: 'grey.200' }}>
                <Container maxWidth="sm">
                    <Typography variant="body2" color="text.secondary" align="center">
                        © 2025 Digital Library Manager (DLM)
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Layout;