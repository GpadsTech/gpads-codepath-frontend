import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Header() {
    const navigate = useNavigate();

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', backgroundColor: '#12121a', borderBottom: '1px solid #29292e' }}>
            <h1 style={{ fontFamily: 'var(--font-pixel)', fontSize: '18px', color: '#fff' }}>
                GPADS CODEPATH
            </h1>

            {/* Clique no avatar redireciona para a rota /profile */}
            <button 
                onClick={() => navigate('/profile')}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                <span style={{ fontSize: '13px', color: '#a0a0c0' }}>
                    Olá, <strong style={{ color: '#fff' }}>Estudante</strong>!
                </span>
                <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#8257e5',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    border: '1px solid #00f0ff'
                }}>
                    E
                </div>
            </button>
        </header>
    );
}