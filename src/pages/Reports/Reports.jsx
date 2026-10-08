import React from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';

export function Reports() {
  return (
    <div style={{ display: 'flex', background: '#1a1a2e', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ padding: '30px', color: '#fff' }}>
          <h1>Relatórios e Atividades</h1>
          <p style={{ color: '#a0a0c0' }}>Acompanhe os seus relatórios semanais enviados.</p>
        </main>
      </div>
    </div>
  );
}
export default Reports;