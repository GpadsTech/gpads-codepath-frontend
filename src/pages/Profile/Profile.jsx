import React from 'react';
// 1. Hooks do React Router Dom para navegação
import { useNavigate } from 'react-router-dom';

// 2. Método de Logout do Firebase Authentication
import { signOut } from 'firebase/auth';
import { auth } from '../../infrastructure/firebase/firebaseConfig';

// 3. Hook customizado de Autenticação do projeto
import { useAuth } from '../../hooks/useAuth';

export function Profile() {
    const navigate = useNavigate();
    // Extrai o utilizador atualmente logado
    const { user } = useAuth();

    /**
     * Função responsável por deslogar o utilizador do Firebase
     * e redirecionar para a tela inicial/login
     */
    const handleLogout = async () => {
        try {
            // A. Chama a API do Firebase para encerrar a sessão
            await signOut(auth);
            
            // B. Redireciona para a rota raiz de Login e substitui o histórico de navegação
            //    (O 'replace: true' impede que o utilizador volte ao clicar na seta "Voltar" do navegador)
            navigate('/', { replace: true });
        } catch (error) {
            console.error("Erro ao encerrar a sessão:", error);
        }
    };

    // Dados com fallbacks dinâmicos
    const userName = user?.displayName || user?.name || "Samara Jovino";
    const userEmail = user?.email || "samaramelosa@gmail.com";
    const userInitial = userName.charAt(0).toUpperCase();

    return (
        <div style={{ color: '#fff', maxWidth: '800px', margin: '0 auto' }}>
            {/* Título da Seção */}
            <h2 style={{ fontSize: '16px', color: '#00f0ff', marginBottom: '10px' }}>👤 MEU PERFIL</h2>
            <p style={{ color: '#8e95b3', marginBottom: '30px', fontSize: '13px' }}>
                Gerencia as informações da sua conta e dados pessoais.
            </p>

            {/* Cartão de Informações */}
            <div style={{ 
                background: '#15182e', 
                padding: '25px', 
                borderRadius: '8px',
                border: '1px solid #ff007f',
                boxShadow: '0 0 15px rgba(255, 0, 127, 0.15)'
            }}>
                {/* Header com Avatar e Nome */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px' }}>
                    <div style={{ 
                        width: '70px', 
                        height: '70px', 
                        background: 'linear-gradient(135deg, #ff007f, #8b5cf6)', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '24px', 
                        fontFamily: 'var(--font-pixel, monospace)',
                        border: '2px solid #00f0ff'
                    }}>
                        {userInitial}
                    </div>
                    <div>
                        <h3 style={{ fontSize: '18px', color: '#fff' }}>{userName}</h3>
                        <p style={{ fontSize: '13px', color: '#8e95b3' }}>{userEmail}</p>
                    </div>
                </div>

                {/* Dados de Cargo e Branch */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '25px' }}>
                    <div style={{ background: '#0b0c16', padding: '15px', borderRadius: '6px', border: '1px solid #2b2e4a' }}>
                        <span style={{ fontSize: '10px', fontFamily: 'var(--font-pixel, monospace)', color: '#8e95b3', display: 'block', marginBottom: '6px' }}>
                            CARGO / FUNÇÃO
                        </span>
                        <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#00f0ff' }}>
                            Desenvolvedora Frontend / Mentora STEM
                        </span>
                    </div>

                    <div style={{ background: '#0b0c16', padding: '15px', borderRadius: '6px', border: '1px solid #2b2e4a' }}>
                        <span style={{ fontSize: '10px', fontFamily: 'var(--font-pixel, monospace)', color: '#8e95b3', display: 'block', marginBottom: '6px' }}>
                            BRANCH DE TRABALHO
                        </span>
                        <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#00e676' }}>
                            feature/login-e-componentes
                        </span>
                    </div>
                </div>

                {/* Divisória Decorativa em Estilo Pixel */}
                <div style={{ borderTop: '1px dashed #2b2e4a', margin: '20px 0' }} />

                {/* BOTÃO DE LOGOUT / SAIR DA CONTA */}
                <button
                    onClick={handleLogout}
                    style={{
                        width: '100%',
                        padding: '12px',
                        background: 'rgba(255, 51, 102, 0.15)',
                        color: '#ff3366',
                        border: '1px solid #ff3366',
                        borderRadius: '6px',
                        fontFamily: 'var(--font-pixel, monospace)',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = '#ff3366';
                        e.currentTarget.style.color = '#fff';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 51, 102, 0.15)';
                        e.currentTarget.style.color = '#ff3366';
                    }}
                >
                    🚪 SAIR DA CONTA
                </button>
            </div>
        </div>
    );
}

export default Profile;