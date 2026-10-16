import React from 'react';

export function Sidebar() {
  return (
    <aside style={{ 
      width: '250px', 
      height: '100vh', 
      background: '#1e1e38', 
      color: '#fff', 
      padding: '20px',
      borderRight: '2px solid #333357',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    }}>
      <h3 style={{ fontSize: '16px', color: '#a0a0c0', marginBottom: '10px' }}>NAVEGAÇÃO</h3>
      
      <a href="/dashboard" style={{ color: '#fff', textDecoration: 'none', padding: '10px', borderRadius: '4px', background: '#252542' }}>Início (Dashboard)</a>
      <a href="/ranking" style={{ color: '#a0a0c0', textDecoration: 'none', padding: '10px', borderRadius: '4px' }}>Ranking</a>
      <a href="/avatar" style={{ color: '#a0a0c0', textDecoration: 'none', padding: '10px', borderRadius: '4px' }}>Avatar</a>
      <a href="/reports" style={{ color: '#a0a0c0', textDecoration: 'none', padding: '10px', borderRadius: '4px' }}>Relatórios</a>
      <a href="/profile" style={{ color: '#a0a0c0', textDecoration: 'none', padding: '10px', borderRadius: '4px' }}>Perfil</a>
    </aside>
  );
}