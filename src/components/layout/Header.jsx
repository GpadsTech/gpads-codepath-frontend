import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// Import corrigido com o caminho relativo correto a partir de src/components/layout/
import { PixelAvatar } from '../avatar/PixelAvatar';

export function Header() {
    const navigate = useNavigate();

    // Extrai o objeto 'user' do estado global de autenticação
    const { user } = useAuth();

    // LÓGICA DINÂMICA DE USUÁRIO E PAPEL (ROLE)
    // Identifica se a conta pertence a um Avaliador/Mestre
    const userRole = (user?.role || user?.type || "").toLowerCase();
    const isAvaliador = userRole === 'leader' ||
                        userRole === 'evaluator' ||
                        userRole === 'admin';

    // Define o nome dinâmico (prioriza o nome real retornado pela API/Firebase)
    const userName = user?.displayName || user?.name || (isAvaliador ? "Mestre Avaliador" : "Estudante");

    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            backgroundColor: '#12121a',
            borderBottom: '1px solid #29292e'
        }}>
            {/* Título Principal da Plataforma */}
            <h1 style={{ fontFamily: 'var(--font-pixel)', fontSize: '18px', color: '#fff' }}>
                GPADS CODEPATH
            </h1>

            {/* Botão Clicável do Canto Superior Direito */}
            <button
                onClick={() => navigate('/profile')}
                title="Ir para o Meu Perfil"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    transition: 'background 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
                {/* Saudação com Nome Dinâmico */}
                <span style={{ fontSize: '13px', color: '#a0a0c0' }}>
                    Olá, <strong style={{ color: '#fff' }}>{userName}</strong>!
                </span>

                {/* Avatar Circular Dinâmico com Boneco Pixel Art */}
                <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: isAvaliador
                        ? 'linear-gradient(135deg, #ffcc00, #ff007f)'
                        : 'linear-gradient(135deg, #15182e, #2b2e4a)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: isAvaliador ? '1px solid #ffcc00' : '1px solid #00f0ff',
                    boxShadow: isAvaliador ? '0 0 8px rgba(255, 204, 0, 0.3)' : '0 0 8px rgba(0, 240, 255, 0.3)',
                    overflow: 'hidden' // Garante que o bonequinho fique cortado perfeitamente dentro do círculo
                }}>
                    <PixelAvatar avatarId={user?.avatarId}
                        size={32}
                        equippedItem={user?.equippedItem || "Chapéu CodePath"}
                        userSeed={user?.email || "CodePathStudent"}
                    />
                </div>
            </button>
        </header>
    );
}

export default Header;