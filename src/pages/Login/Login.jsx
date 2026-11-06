import React, { useState } from 'react';
import { ForgotPassword } from '../ForgotPassword/ForgotPassword';

export function Login() {
    const [isRecovering, setIsRecovering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);
        try {
            // Simulação de login
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (err) {
            setError('Erro ao efetuar login. Verifique as suas credenciais.');
        } finally {
            setLoading(false);
        }
    };

    // Se o utilizador clicou para recuperar a palavra-passe, mostramos o componente ForgotPassword
    if (isRecovering) {
        return <ForgotPassword onBackToLogin={() => setIsRecovering(false)} />;
    }

    return (
        <div style={{ 
            color: '#fff', 
            maxWidth: '450px', 
            margin: '40px auto', 
            padding: '30px', 
            background: '#1e1e38', 
            borderRadius: '12px',
            border: '1px solid #333357',
            boxSizing: 'border-box'
        }}>
            <h2 style={{ marginBottom: '10px', fontSize: '22px', textAlign: 'center' }}>Bem-vindo de volta</h2>
            <p style={{ color: '#a0a0c0', marginBottom: '25px', fontSize: '13px', textAlign: 'center' }}>
                Entre na sua conta para gerir os projetos da plataforma.
            </p>

            {error && (
                <div style={{ background: '#ff6b6b22', border: '1px solid #ff6b6b', color: '#ff6b6b', padding: '12px', borderRadius: '6px', fontSize: '13px', marginBottom: '20px' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ textAlign: 'left' }}>
                    <label style={{ fontSize: '13px', display: 'block', marginBottom: '6px', color: '#a0a0c0' }}>E-mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="exemplo@email.com"
                        style={{ width: '100%', padding: '12px', borderRadius: '6px', background: '#252542', border: '1px solid #333357', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                    />
                </div>

                <div style={{ textAlign: 'left' }}>
                    <label style={{ fontSize: '13px', display: 'block', marginBottom: '6px', color: '#a0a0c0' }}>Palavra-passe</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        style={{ width: '100%', padding: '12px', borderRadius: '6px', background: '#252542', border: '1px solid #333357', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '12px',
                        background: '#6c63ff',
                        color: '#fff',
                        border: '2px solid #8b83ff',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1,
                        transition: 'background 0.2s'
                    }}
                >
                    {loading ? 'A ENTRAR...' : 'ENTRAR'}
                </button>
            </form>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button
                    type="button"
                    onClick={() => setIsRecovering(true)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#8b83ff',
                        fontSize: '13px',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                    }}
                >
                    Esqueceu-se da palavra-passe?
                </button>
            </div>
        </div>
    );
}

export default Login;