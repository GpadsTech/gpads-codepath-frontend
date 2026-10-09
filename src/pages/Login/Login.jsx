import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            setMessage("Login bem-sucedido! A redirecionar...");
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        } else {
            setMessage("Por favor, preenche o e-mail e a senha.");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#1a1a2e' }}>
            <div style={{ background: '#252542', padding: '40px', borderRadius: '8px', width: '380px', textAlign: 'center', color: '#fff' }}>
                <h2>GPADS CODEPATH</h2>
                <p style={{ fontSize: '12px', marginBottom: '20px', color: '#a0a0c0' }}>START YOUR CODING JOURNEY</p>
                
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '15px', textAlign: 'left' }}>
                        <label style={{ fontSize: '14px' }}>E-mail</label>
                        <Input
                            type="email"
                            placeholder="seu.email@gpadstech.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                        <label style={{ fontSize: '14px' }}>Senha</label>
                        <Input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button variant="primary" type="submit" style={{ width: '100%' }}>
                        ENTRAR
                    </Button>
                </form>

                {message && (
                    <p style={{ marginTop: '15px', fontSize: '12px', color: '#ffcc00' }}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Login;