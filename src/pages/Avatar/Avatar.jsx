import React from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';

export function Avatar() {
  return (
    <div style={{ display: 'flex', background: '#1a1a2e', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ padding: '30px', color: '#fff' }}>
          <h1>Meu Avatar</h1>
          <p style={{ color: '#a0a0c0' }}>Personalize o seu personagem e nível.</p>
        </main>
      </div>
    </div>
  );
}
export default Avatar;