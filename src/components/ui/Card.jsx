JavaScript
import React from 'react';

export function Card({ children, className = '' }) {
  return (
    <div className={`card ${className}`} style={{ background: '#252542', padding: '20px', borderRadius: '8px', color: '#fff' }}>
      {children}
    </div>
  );
}