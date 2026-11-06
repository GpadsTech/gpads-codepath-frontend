import React, { useState } from 'react';

export function ForgotPassword({ onBackToLogin }) {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim() || !email.includes('@')) {
            setError('Por favor, insira um e-mail válido.');
            return;
        }

        setLoading(true);

        try {
            // Simulação de chamada de recuperação de palavra-passe
            await new Promise((resolve) => setTimeout(resolve, 1200));
            
            // Critério de Aceite: A confirmação NÃO expõe a existência da conta
            setSubmitted(true);
        } catch (err) {
            console.error('Erro ao processar recuperação:', err);
            setError('Ocorreu um erro ao processar o pedido. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

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
            <h2 style={{ marginBottom: '10px', fontSize: '22px', textAlign: 'center' }}>Recuperar Palavra-passe</h2>
            <p style={{ color: '#a0a0c0', marginBottom: '25px', fontSize: '13px', textAlign: 'center', lineHeight: '1.5' }}>
                Insira o seu e-mail institucional ou pessoal associado para receber as instruções de recuperação de acesso.
            </p>

            {!submitted ? (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label 
                            htmlFor="recovery-email" 
                            style={{ fontSize: '13px', display: 'block', marginBottom: '6px', color: '#a0a0c0' }}
                        >
                            E-mail de Acesso
                        </label>
                        <input
                            id="recovery-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="exemplo@email.com"
                            style={{ 
                                width: '100%', 
                                padding: '12px', 
                                borderRadius: '6px', 
                                background: '#252542', 
                                border: error ? '1px solid #ff6b6b' : '1px solid #333357', 
                                color: '#fff', 
                                outline: 'none', 
                                boxSizing: 'border-box',
                                fontSize: '14px'
                            }}
                        />
                        {error && (
                            <span style={{ fontSize: '12px', color: '#ff6b6b', marginTop: '6px', display: 'block' }}>
                                {error}
                            </span>
                        )}
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
                            fontSize: '14px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                            transition: 'background 0.2s'
                        }}
                    >
                        {loading ? 'A PROCESSAR...' : 'ENVIAR INSTRUÇÕES'}
                    </button>
                </form>
            ) : (
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ 
                        background: '#2ecc7122', 
                        border: '1px solid #2ecc71', 
                        color: '#2ecc71', 
                        padding: '16px', 
                        borderRadius: '6px', 
                        fontSize: '14px',
                        lineHeight: '1.5'
                    }}>
                        Se o e-mail estiver registado no sistema, receberá as instruções de recuperação em breve. Verifique também a sua caixa de spam.
                    </div>
                </div>
            )}

            {/* Botão de Retorno ao Login */}
            <div style={{ marginTop: '25px', textAlign: 'center' }}>
                <button
                    type="button"
                    onClick={onBackToLogin}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#8b83ff',
                        fontSize: '13px',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                    }}
                >
                    Voltar para o Login
                </button>
            </div>
        </div>
    );
}

export default ForgotPassword;