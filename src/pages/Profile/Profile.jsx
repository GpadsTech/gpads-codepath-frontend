import React from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';

export function Profile() {
  return (
    <div style={{ display: 'flex', background: '#1a1a2e', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ padding: '30px', color: '#fff' }}>
          <h1>Meu Perfil</h1>
          <p style={{ color: '#a0a0c0' }}>Gerencie as informações da sua conta.</p>
        </main>
      </div>
    </div>
  );
}
export default Profile;