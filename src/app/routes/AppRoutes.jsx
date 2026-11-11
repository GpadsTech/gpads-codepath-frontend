import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login/Login';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { Profile } from '../pages/Profile/Profile';
import { Ranking } from '../pages/Ranking/Ranking';
import { Reports } from '../pages/Reports/Reports';
import { Users } from '../pages/Users/Users';
import { Avatar } from '../pages/Avatar/Avatar';
import { ForgotPassword } from '../pages/ForgotPassword/ForgotPassword';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      {/* Rota pública de Login */}
      <Route path="/login" element={<Login />} />

      {/* Rota pública de Recuperação de Senha */}
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Rotas protegidas que exigem autenticação */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/ranking" element={<ProtectedRoute><Ranking /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
      <Route path="/avatar" element={<ProtectedRoute><Avatar /></ProtectedRoute>} />

      {/* Rota padrão redireciona para o login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;