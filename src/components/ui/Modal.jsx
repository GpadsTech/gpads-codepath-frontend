import React from 'react';

export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: '#252542', padding: '20px', borderRadius: '8px', width: '400px', color: '#fff' }}>
        {children}
        <button onClick={onClose} style={{ marginTop: '15px', padding: '5px 10px' }}>Fechar</button>
      </div>
    </div>
  );
}