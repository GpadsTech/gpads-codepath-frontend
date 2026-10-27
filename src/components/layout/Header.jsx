import React from 'react';
// 1. Hook do React Router para navegação programática ao clicar no perfil
import { useNavigate } from 'react-router-dom';

// 2. Hook customizado de autenticação para buscar os dados do usuário em tempo real
import { useAuth } from '../../hooks/useAuth';

export function Header() {
    const navigate = useNavigate();

    // Extrai o objeto 'user' do estado global de autenticação
    const { user } = useAuth();

    // =========================================================
    // LÓGICA DINÂMICA DE USUÁRIO E PAPEL (ROLE)
    // =========================================================
    // Identifica se a conta pertence a um Avaliador/Mestre
    const userRole = (user?.role || user?.type || "").toLowerCase();
    const isAvaliador = userRole === 'avaliador' || 
                        userRole === 'evaluator' || 
                        userRole === 'admin' || 
                        user?.email?.includes('avaliador');

    // Define o nome dinâmico (prioriza o nome real retornado pela API/Firebase)
    const userName = user?.displayName || user?.name || (isAvaliador ? "Mestre Avaliador" : "Estudante");

    // Extrai a primeira letra do nome para o avatar dinâmico
    const userInitial = userName.charAt(0).toUpperCase();

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

                {/* Avatar Circular Dinâmico com Inicial do Nome */}
                <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: isAvaliador 
                        ? 'linear-gradient(135deg, #ffcc00, #ff007f)' 
                        : 'linear-gradient(135deg, #8257e5, #6c63ff)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    border: isAvaliador ? '1px solid #ffcc00' : '1px solid #00f0ff',
                    boxShadow: isAvaliador ? '0 0 8px rgba(255, 204, 0, 0.3)' : '0 0 8px rgba(0, 240, 255, 0.3)'
                }}>
                    {userInitial}
                </div>
            </button>
        </header>
    );
}

export default Header;