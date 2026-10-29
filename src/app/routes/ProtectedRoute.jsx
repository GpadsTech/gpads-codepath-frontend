import React from 'react';
// Navigate: Redireciona o usuário programaticamente no JSX
// Outlet: Renderiza as rotas filhas quando usamos o ProtectedRoute como Layout Parent no React Router
import { Navigate, Outlet } from 'react-router-dom';

// Importa o seu hook customizado de autenticação
import { useAuth } from '../../hooks/useAuth';

/**
 * Componente Guardião de Rotas (ProtectedRoute)
 * Impede que usuários não autenticados acessem telas internas via URL.
 */
export default function ProtectedRoute({ children }) {
    // Busca o estado real da autenticação e o status de carregamento do Firebase
    const { isAuthenticated, loading, error } = useAuth();

    // PASSO 1: Enquanto o Firebase ainda está verificando o token do usuário no localStorage/session...
    if (loading) {
        return (
            <div style={{
                height: '100vh',
                width: '100vw',
                backgroundColor: '#0c0d18',
                color: '#00f0ff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'var(--font-pixel, monospace)',
                fontSize: '12px',
                gap: '16px'
            }}>
                {/* Ícone ou efeito visual retro de carregamento */}
                <div style={{ fontSize: '28px', animation: 'spin 1s linear infinite' }}>👾</div>
                <p style={{ letterSpacing: '1px' }}>VERIFICANDO CREDENCIAIS...</p>
            </div>
        );
    }

    // PASSO 2: Se o Firebase terminou de carregar e o usuário NÃO está autenticado...
    if (error) return <div role="alert" style={{padding: 40, color: "#fff"}}>Não foi possível carregar seu perfil. {error.message} <button onClick={() => window.location.reload()}>Tentar novamente</button></div>;
    if (!isAuthenticated) {
        // Redireciona para a tela de Login ("/") e substitui o histórico (replace) para ele não conseguir voltar no botão do navegador
        return <Navigate to="/" replace />;
    }

    // PASSO 3: Se o usuário ESTÁ autenticado, libera o acesso às páginas internas!
    // Retorna 'children' (se passado diretamente) ou '<Outlet />' (para rotas aninhadas do React Router)
    return children ? children : <Outlet />;
}