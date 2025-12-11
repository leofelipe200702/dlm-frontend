import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import CategoryList from './components/CategoryList.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; 

const Home = () => <h1>Página Inicial</h1>;
const Dashboard = () => <h1>Dashboard (Área Protegida)</h1>;
const AdminPage = () => <h1>Página de Administração</h1>; // Novo placeholder para testes de permissão

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Implementação da Proteção de Rota */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Exemplo de Rota para CRUDs (Futuro) */}
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="management/categories" 
            element={
              <ProtectedRoute>
                {/* Aqui, idealmente, checaríamos se o usuário é ADMIN ou LIBRARIAN */}
                <CategoryList/>
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;