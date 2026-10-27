import React from 'react';
// Componentes essenciais do React Router Dom para navegação e proteção
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importação das Páginas do Projeto
import { Login } from './pages/Login/Login';
import { DefaultLayout } from './components/layout/DefaultLayout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Ranking } from './pages/Ranking/Ranking';
import { Avatar } from './pages/Avatar/Avatar';
import { Reports } from './pages/Reports/Reports';
import { Profile } from './pages/Profile/Profile';

// Importação do nosso Guardião de Rotas
import ProtectedRoute from "./app/routes/ProtectedRoute";

export function App() {
  return (
    <Router>
      <Routes>
        {/* ==========================================
            1. ROTA PÚBLICA (Tela de Autenticação/Login)
           ========================================== */}
        <Route path="/" element={<Login />} />

        {/* ==========================================
            2. ROTAS PROTEGIDAS (Exigem Login Ativo)
           ========================================== */}
        {/* O 'element={<ProtectedRoute />}' vai interceptar todas as rotas filhas abaixo.
            Se o usuário não estiver logado, ele é ejetado imediatamente para o '/' */}
        <Route element={<ProtectedRoute />}>
          
          {/* Todas as páginas aqui dentro compartilham a Sidebar e o Header (DefaultLayout) */}
          <Route element={<DefaultLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/avatar" element={<Avatar />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

        </Route>

        {/* ==========================================
            3. TRATAMENTO DE ERROS DE ROTA (Catch-All)
           ========================================== */}
        {/* Qualquer URL inválida ou tentativa de acesso maliciosa (ex: /login/ranking) 
            é redirecionada para a tela inicial */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;