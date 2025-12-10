import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

// Este componente recebe o componente que ele deve renderizar (o 'children')
const ProtectedRoute = ({ children }) => {
    const user = AuthService.getCurrentUser();

    if (!user) {
        // Se NÃO houver usuário (token), redireciona para a página de login
        return <Navigate to="/login" replace />;
    }

    // Se houver usuário (token), renderiza o componente filho (o Dashboard ou outro)
    return children;
};

export default ProtectedRoute;