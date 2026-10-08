import React from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';

export function Ranking() {
  return (
    <div style={{ display: 'flex', background: '#1a1a2e', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ padding: '30px', color: '#fff' }}>
          <h1>Ranking da Célula</h1>
          <p style={{ color: '#a0a0c0' }}>Veja a classificação dos estudantes.</p>
          <ul style={{ marginTop: '20px', listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '10px', background: '#252542', marginBottom: '10px', borderRadius: '4px' }}>#1 - João Santos (1500 XP)</li>
            <li style={{ padding: '10px', background: '#252542', marginBottom: '10px', borderRadius: '4px' }}>#2 - Maria Silva (1500 XP)</li>
            <li style={{ padding: '10px', background: '#252542', marginBottom: '10px', borderRadius: '4px' }}>#3 - Pedro Souza (1420 XP)</li>
          </ul>
        </main>
      </div>
    </div>
  );
}
export default Ranking;