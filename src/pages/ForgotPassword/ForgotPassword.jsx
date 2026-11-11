import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiClient } from '../../infrastructure/api/apiClient';

const api = new ApiClient();

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Chamada genérica de recuperação de senha (ajustada para não expor erros detalhados de conta)
      await api.post('/auth/forgot-password/', { email });
    } catch (err) {
      // Por motivos de segurança, ignoramos erros específicos de "e-mail não encontrado" 
      // para evitar que invasores descubram quais e-mails estão cadastrados na plataforma.
      console.error('Erro na recuperação:', err);
    } finally {
      setLoading(false);
      // Sempre exibimos a mensagem de sucesso genérica para o usuário
      setSubmitted(true);
    }
  };

  return (
    <div className="cp-page cp-auth-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="cp-panel cp-accent-blue" style={{ width: '100%', maxWidth: '420px', padding: '2rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2>Recuperação de Senha</h2>
          <p className="cp-muted" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Digite seu e-mail cadastrado para receber as instruções de redefinição de acesso.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {error && (
              <p role="alert" className="cp-notice" style={{ color: '#ff6b6b', fontSize: '0.85rem' }}>
                {error}
              </p>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label htmlFor="email-input" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                E-mail
              </label>
              <input
                id="email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@ifpe.edu.br"
                aria-label="E-mail para recuperação"
                style={{
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid var(--cp-border, #ccc)',
                  background: 'var(--cp-input-bg, #fff)',
                  color: 'inherit',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cp-link"
              style={{
                marginTop: '0.5rem',
                padding: '0.75rem',
                border: 'none',
                borderRadius: '6px',
                background: 'var(--cp-accent, #3b82f6)',
                color: '#fff',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                textAlign: 'center',
                display: 'block',
                width: '100%',
              }}
            >
              {loading ? 'Enviando...' : 'Enviar instruções →'}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div 
              role="status" 
              aria-live="polite" 
              className="cp-notice" 
              style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '6px' }}
            >
              <p style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>
                Se houver uma conta associada ao e-mail <b>{email}</b>, você receberá um link de recuperação em instantes. Verifique também sua caixa de spam.
              </p>
            </div>
          </div>
        )}

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link to="/login" className="cp-link" style={{ fontSize: '0.9rem', textDecoration: 'underline' }}>
            ← Voltar para o Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;