import React from 'react';
// 1. Hooks do React Router Dom para navegação após o logout
import { useNavigate } from 'react-router-dom';

// 2. Função de encerramento de sessão do Firebase Auth
import { signOut } from 'firebase/auth';
import { auth } from '../../infrastructure/firebase/firebaseConfig';

// 3. Hook do projeto que traz os dados do usuário autenticado (incluindo cargo/role da API)
import { useAuth } from '../../hooks/useAuth';

export function Profile() {
    const navigate = useNavigate();
    // Traz o objeto `user` dinâmico do estado global de autenticação
    const { user } = useAuth();

    /**
     * Função para deslogar do Firebase e redirecionar para a tela inicial
     */
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/', { replace: true });
        } catch (error) {
            console.error("Erro ao encerrar a sessão:", error);
        }
    };

    // =========================================================
    // 1. IDENTIFICAÇÃO DINÂMICA DO PERFIL (AVALIADOR vs ESTUDANTE)
    // =========================================================
    // Verifica a propriedade 'role', 'type' ou analisa o e-mail para identificar o tipo de conta
    const userRole = (user?.role || user?.type || "").toLowerCase();
    const isAvaliador = userRole === 'avaliador' || 
                        userRole === 'evaluator' || 
                        userRole === 'admin' || 
                        user?.email?.includes('avaliador');

    // Definição dinâmica de Nome, E-mail e Inicial
    const userEmail = user?.email || "usuario@gpadstech.com";
    
    // Nome do usuário com fallback de acordo com a regra de negócio do papel
    const userName = user?.displayName || user?.name || (isAvaliador ? "Mestre Avaliador" : "Estudante CodePath");
    const userInitial = userName.charAt(0).toUpperCase();

    // Cargo e Detalhes dinâmicos dependendo do papel
    const cargoFuncao = user?.cargo || user?.function || (
        isAvaliador 
            ? "Mestre Avaliador / Gestor de Guilda" 
            : "Desenvolvedor(a) Frontend / Estudante STEM"
    );

    const branchOuSetor = user?.branch || user?.setor || (
        isAvaliador 
            ? "main / painel-de-revisao" 
            : "feature/login-e-componentes"
    );

    return (
        <div style={{ color: '#fff', maxWidth: '800px', margin: '0 auto' }}>
            {/* Título da Seção */}
            <h2 style={{ fontSize: '16px', color: '#00f0ff', marginBottom: '10px' }}>👤 MEU PERFIL</h2>
            <p style={{ color: '#8e95b3', marginBottom: '30px', fontSize: '13px' }}>
                Gerencia as informações da sua conta e dados pessoais.
            </p>

            {/* Cartão de Informações do Perfil */}
            <div style={{ 
                background: '#15182e', 
                padding: '25px', 
                borderRadius: '8px',
                border: isAvaliador ? '1px solid #ffcc00' : '1px solid #ff007f', // Destaque Amarelo para Avaliador
                boxShadow: isAvaliador 
                    ? '0 0 15px rgba(255, 204, 0, 0.2)' 
                    : '0 0 15px rgba(255, 0, 127, 0.15)'
            }}>
                {/* Header com Avatar, Nome e Tag de Função */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px' }}>
                    <div style={{ 
                        width: '70px', 
                        height: '70px', 
                        background: isAvaliador 
                            ? 'linear-gradient(135deg, #ffcc00, #ff007f)' 
                            : 'linear-gradient(135deg, #ff007f, #8b5cf6)', 
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <h3 style={{ fontSize: '18px', color: '#fff' }}>{userName}</h3>
                            
                            {/* Badge indicativo de Avaliador / Estudante */}
                            <span style={{
                                fontSize: '9px',
                                fontFamily: 'var(--font-pixel, monospace)',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                backgroundColor: isAvaliador ? 'rgba(255, 204, 0, 0.2)' : 'rgba(0, 240, 255, 0.2)',
                                color: isAvaliador ? '#ffcc00' : '#00f0ff',
                                border: isAvaliador ? '1px solid #ffcc00' : '1px solid #00f0ff'
                            }}>
                                {isAvaliador ? '👑 AVALIADOR' : '🎓 ESTUDANTE'}
                            </span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#8e95b3', marginTop: '4px' }}>{userEmail}</p>
                    </div>
                </div>

                {/* Bloco de Detalhes Dinâmicos do Usuário */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '25px' }}>
                    
                    {/* Campo 1: Cargo / Função */}
                    <div style={{ background: '#0b0c16', padding: '15px', borderRadius: '6px', border: '1px solid #2b2e4a' }}>
                        <span style={{ fontSize: '10px', fontFamily: 'var(--font-pixel, monospace)', color: '#8e95b3', display: 'block', marginBottom: '6px' }}>
                            CARGO / FUNÇÃO
                        </span>
                        <span style={{ fontWeight: 'bold', fontSize: '14px', color: isAvaliador ? '#ffcc00' : '#00f0ff' }}>
                            {cargoFuncao}
                        </span>
                    </div>

                    {/* Campo 2: Branch / Área de Atuação */}
                    <div style={{ background: '#0b0c16', padding: '15px', borderRadius: '6px', border: '1px solid #2b2e4a' }}>
                        <span style={{ fontSize: '10px', fontFamily: 'var(--font-pixel, monospace)', color: '#8e95b3', display: 'block', marginBottom: '6px' }}>
                            {isAvaliador ? 'PAINEL DE CONTROLE' : 'BRANCH DE TRABALHO'}
                        </span>
                        <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#00e676' }}>
                            {branchOuSetor}
                        </span>
                    </div>

                </div>

                {/* Divisória em estilo Pixel */}
                <div style={{ borderTop: '1px dashed #2b2e4a', margin: '20px 0' }} />

                {/* Botão para Encerrar Sessão */}
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