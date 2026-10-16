import React from 'react';

export function Input({ type = 'text', placeholder, value, onChange, name }) {
  return (
    <input 
      type={type} 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange} 
      name={name}
      style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#1a1a2e', color: '#fff', marginTop: '5px' }}
    />
  );
}