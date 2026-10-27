import React, { useState } from 'react';
// 1. Hook para redirecionar de página no React Router Dom
import { useNavigate } from 'react-router-dom';

// 2. Serviço de autenticação com e-mail e senha do Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../infrastructure/firebase/firebaseConfig';

// 3. Imagem de fundo em pixel art vinda da pasta src/assets/
import bgPixelCity from '../../assets/bg-pixel-city.jpg';

export function Login() {
    // Estados locais para controlar e-mail, senha, erros e carregamento
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    /**
     * Trata o envio do formulário no Firebase Auth
     */
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard'); // Sucesso: vai para a Dashboard
        } catch (err) {
            console.error("Erro ao autenticar:", err);
            setError("Erro ao entrar. Verifique o seu e-mail e palavra-passe.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'relative',
            width: '100vw',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',

            /* Imagem de Fundo Pixel Art */
            backgroundImage: `url(${bgPixelCity})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>

            {/* =========================================================
               CARTÃO DE LOGIN GLASSMORPHIC AMPLIADO
               ========================================================= */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                
                /* Efeito de Vidro Transparente Fosco */
                background: 'rgba(255, 255, 255, 0.45)', 
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                
                padding: '48px 40px',
                borderRadius: '20px',
                width: '440px',
                maxWidth: '90vw',
                
                textAlign: 'center',
                color: '#0e0e17',
                border: '1.5px solid rgba(255, 255, 255, 0.85)',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.28), inset 0 0 20px rgba(255, 255, 255, 0.6)'
            }}>

                {/* =========================================================
                   CABEÇALHO DO TÍTULO (IGUAL À SEGUNDA IMAGEM)
                   1ª linha: GPADS + Controle Pixel Art
                   2ª linha: CODEPATH
                   3ª linha: START YOUR CODING JOURNEY
                   ========================================================= */}
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    marginBottom: '28px' 
                }}>
                    
                    {/* Bloco das duas linhas do título */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        
                        {/* Linha 1: "GPADS" + Ícone do Controle Pixel Art */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{
                                fontFamily: 'var(--font-pixel, monospace)',
                                fontSize: '28px',
                                fontWeight: 'bold',
                                color: '#0e0e17',
                                lineHeight: '1.1',
                                letterSpacing: '-0.5px'
                            }}>
                                GPADS
                            </span>

                            {/* CONTROLE EM PIXEL ART SVG (VETORIAL DE ALTA DEFINIÇÃO) */}
                            <svg 
                                width="38" 
                                height="28" 
                                viewBox="0 0 24 18" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ imageRendering: 'pixelated', display: 'block' }}
                            >
                                {/* Cabo do Controle */}
                                <path d="M11 0H13V3H11V0Z" fill="#1e1b4b" />
                                <path d="M12 1C14 1 15 2 15 3" stroke="#1e1b4b" strokeWidth="1" />

                                {/* Corpo do Controle (Degradê Pixel) */}
                                <path d="M3 4H21V6H23V14H21V16H18V14H16V12H8V14H6V16H3V14H1V6H3V4Z" fill="#7071e8" />
                                <path d="M4 5H20V7H22V13H20V15H18V13H15V11H9V13H6V15H4V13H2V7H4V5Z" fill="#a0a1ff" />

                                {/* D-Pad (Direcionais à esquerda) */}
                                <rect x="5" y="8" width="2" height="4" fill="#1e1b4b" />
                                <rect x="4" y="9" width="4" height="2" fill="#1e1b4b" />

                                {/* Botões Coloridos (A, B, X, Y à direita) */}
                                <rect x="17" y="7.5" width="2" height="2" fill="#ff5577" /> {/* Rosa */}
                                <rect x="19" y="9" width="2" height="2" fill="#ffcc00" />   {/* Amarelo */}
                                <rect x="15" y="9" width="2" height="2" fill="#00e676" />   {/* Verde */}
                                <rect x="17" y="10.5" width="2" height="2" fill="#00f0ff" /> {/* Ciano */}
                            </svg>
                        </div>

                        {/* Linha 2: "CODEPATH" */}
                        <span style={{
                            fontFamily: 'var(--font-pixel, monospace)',
                            fontSize: '28px',
                            fontWeight: 'bold',
                            color: '#0e0e17',
                            lineHeight: '1.1',
                            letterSpacing: '-0.5px'
                        }}>
                            CODEPATH
                        </span>
                    </div>

                    {/* Subtítulo: "START YOUR CODING JOURNEY" */}
                    <p style={{
                        fontFamily: 'var(--font-pixel, monospace)',
                        fontSize: '11px',
                        color: '#2a2b4a',
                        marginTop: '12px',
                        letterSpacing: '0.8px'
                    }}>
                        START YOUR CODING JOURNEY
                    </p>
                </div>

                {/* Mensagem de Erro */}
                {error && (
                    <div style={{
                        background: 'rgba(255, 51, 102, 0.2)',
                        border: '1px solid #ff3366',
                        color: '#800020',
                        padding: '12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        marginBottom: '20px',
                        fontWeight: 'bold'
                    }}>
                        {error}
                    </div>
                )}

                {/* Formulário de Login */}
                <form onSubmit={handleLogin}>
                    {/* Campo E-mail */}
                    <div style={{ marginBottom: '18px', textAlign: 'left' }}>
                        <label style={{
                            fontSize: '11px',
                            fontFamily: 'var(--font-pixel, monospace)',
                            display: 'block',
                            marginBottom: '8px',
                            color: '#1c1d36',
                            fontWeight: 'bold'
                        }}>
                            E-MAIL
                        </label>
                        <input
                            type="email"
                            placeholder="seu.email@gpadstech.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '14px',
                                borderRadius: '8px',
                                background: 'rgba(255, 255, 255, 0.8)',
                                border: '1px solid rgba(0, 0, 0, 0.2)',
                                color: '#000',
                                outline: 'none',
                                boxSizing: 'border-box',
                                fontFamily: 'var(--font-family, sans-serif)',
                                fontSize: '14px'
                            }}
                        />
                    </div>

                    {/* Campo Palavra-passe */}
                    <div style={{ marginBottom: '26px', textAlign: 'left' }}>
                        <label style={{
                            fontSize: '11px',
                            fontFamily: 'var(--font-pixel, monospace)',
                            display: 'block',
                            marginBottom: '8px',
                            color: '#1c1d36',
                            fontWeight: 'bold'
                        }}>
                            PALAVRA-PASSE
                        </label>
                        <input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '14px',
                                borderRadius: '8px',
                                background: 'rgba(255, 255, 255, 0.8)',
                                border: '1px solid rgba(0, 0, 0, 0.2)',
                                color: '#000',
                                outline: 'none',
                                boxSizing: 'border-box',
                                fontFamily: 'var(--font-family, sans-serif)',
                                fontSize: '14px'
                            }}
                        />
                    </div>

                    {/* Botão Entrar */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: 'rgba(255, 255, 255, 0.95)',
                            color: '#12132a',
                            border: '2px solid #12132a',
                            borderRadius: '8px',
                            fontFamily: 'var(--font-pixel, monospace)',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            opacity: loading ? 0.7 : 1,
                            boxShadow: '0 4px 0 #12132a',
                            transition: 'all 0.1s ease'
                        }}
                    >
                        {loading ? 'A ENTRAR...' : 'ENTRAR'}
                    </button>
                </form>

                {/* Divisória tracejada */}
                <div style={{
                    margin: '24px 0 18px',
                    borderBottom: '1px dashed rgba(18, 19, 42, 0.35)'
                }} />

                {/* Ajuda / Esqueceu a Senha */}
                <p style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-pixel, monospace)',
                    color: '#2a2b4a',
                    cursor: 'pointer'
                }}>
                    Esqueceu a senha? Precisa de ajuda?
                </p>
            </div>
        </div>
    );
}

export default Login;