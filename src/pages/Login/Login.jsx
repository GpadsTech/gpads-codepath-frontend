import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../infrastructure/firebase/firebaseConfig';

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
        } catch (err) {
            console.error("Erro ao autenticar:", err);
            setError("Erro ao entrar. Verifique o seu e-mail e palavra-passe.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#12121a' }}>
            <div style={{ background: '#1e1e38', padding: '40px', borderRadius: '8px', width: '380px', textAlign: 'center', color: '#fff', border: '1px solid #333357' }}>
                <h2>GPADS CODEPATH</h2>
                <p style={{ fontSize: '12px', marginBottom: '20px', color: '#a0a0c0' }}>Autenticação Firebase</p>
                
                {error && (
                    <div style={{ background: '#ff6b6b22', border: '1px solid #ff6b6b', color: '#ff6b6b', padding: '10px', borderRadius: '4px', fontSize: '13px', marginBottom: '15px' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '15px', textAlign: 'left' }}>
                        <label style={{ fontSize: '14px', display: 'block', marginBottom: '5px' }}>E-mail</label>
                        <input
                            type="email"
                            placeholder="seu.email@gpadstech.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', background: '#252542', border: '1px solid #333357', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                        <label style={{ fontSize: '14px', display: 'block', marginBottom: '5px' }}>Palavra-passe</label>
                        <input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', background: '#252542', border: '1px solid #333357', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{ width: '100%', padding: '12px', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? 'A ENTRAR...' : 'ENTRAR'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;