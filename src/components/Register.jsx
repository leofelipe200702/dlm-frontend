import React, { useState } from 'react';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

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
            // Chama o serviço de registro. A role "admin" será atribuída se passada, 
            // mas aqui mantemos simples e deixamos o backend atribuir ROLE_USER (o padrão)
            await AuthService.register(username, email, password);

            setMessage('Registro realizado com sucesso! Faça login.');
            setSuccessful(true);
            // Navega automaticamente para o login após o sucesso
            setTimeout(() => navigate('/login'), 2000);

        } catch (error) {
            const resMessage =
                (error.response?.data?.message) ||
                error.message ||
                error.toString();
            setMessage(resMessage || "Erro durante o registro.");
            setSuccessful(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Registro de Usuário</h2>
            <form onSubmit={handleRegister}>
                {/* Exemplo do campo Username */}
                <div className="form-group mb-3">
                    <label htmlFor="username">Usuário</label>
                    <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>

                {/* Campo Email */}
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                {/* Campo Senha */}
                <div className="form-group mb-3">
                    <label htmlFor="password">Senha</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <button type="submit" className="btn btn-success">Registrar</button>

                {message && (
                    <div className={`alert ${successful ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default Register;