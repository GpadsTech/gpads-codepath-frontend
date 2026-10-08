import React from 'react';

export function Header() {
  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '15px 30px', 
      background: '#252542', 
      color: '#fff',
      borderBottom: '2px solid #333357'
    }}>
      <h2>GPADS CODEPATH</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ fontSize: '14px', color: '#a0a0c0' }}>Olá, Estudante!</span>
        <div style={{ 
          width: '35px', 
          height: '35px', 
          background: '#4e4e8a', 
          borderRadius: '50%', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          fontWeight: 'bold'
        }}>
          G
        </div>
      </div>
    </header>
  );
}