import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { DefaultLayout } from './components/layout/DefaultLayout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Ranking } from './pages/Ranking/Ranking';
import { Avatar } from './pages/Avatar/Avatar';
import { Reports } from './pages/Reports/Reports';
import { Profile } from './pages/Profile/Profile';

export function App() {
  return (
    <Router>
      <Routes>
        {/* Página de Login */}
        <Route path="/" element={<Login />} />
        
        {/* Páginas Internas com Layout Padrão */}
        <Route element={<DefaultLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/avatar" element={<Avatar />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;