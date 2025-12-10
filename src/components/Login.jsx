
import React, { useState } from 'react';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            // 1. Chama o serviço de autenticação
            await AuthService.login(username, password);

            // 2. Se for bem-sucedido, navega para a página inicial (Home)
            navigate('/home');
            window.location.reload(); // Recarrega para garantir o estado de login
        } catch (error) {
            // 3. Trata erros (como credenciais inválidas)      
            setMessage("Falha no Login. Verifique suas credenciais.");
            console.error(error.response || error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                    <label htmlFor="username">Usuário</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Entrar</button>

                {message && (
                    <div className="alert alert-danger mt-3" role="alert">
                        {message}
                    </div>
                )}
                <p className="mt-3">Não tem conta? <a href="/register">Registre-se</a></p>
            </form>
        </div>
    );
};

export default Login;