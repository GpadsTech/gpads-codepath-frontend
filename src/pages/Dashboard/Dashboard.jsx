import React from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card } from '../../components/ui/Card';

export function Dashboard() {
  return (
    <div style={{ display: 'flex', background: '#1a1a2e', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ padding: '30px', color: '#fff' }}>
          <h1>Dashboard</h1>
          <p style={{ color: '#a0a0c0', marginBottom: '20px' }}>Bem-vindo(a) ao seu painel principal!</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <Card>
              <h3>Nível 3</h3>
              <p>500 XP</p>
            </Card>
            <Card>
              <h3>Minha Célula</h3>
              <p>Backend Guild</p>
            </Card>
            <Card>
              <h3>Ranking</h3>
              <p>#2 Posição</p>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
export default Dashboard;