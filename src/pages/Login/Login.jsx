import React, { useState import React, { useState } from 'react';
import { loginUser, registerUser } from '../../infrastructure/firebase/firebaseAuth';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async () => {
        try {
            setMessage("");
            const result = await registerUser(email, password);
            console.log("Usuário criado:", result.user);
            setMessage("Conta criada com sucesso! Podes fazer login.");
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            setMessage(`Erro ao criar: ${error.message}`);
        }
    };

    const handleLogin = async () => {
        try {
            setMessage("");
            const result = await loginUser(email, password);
            console.log("Login realizado:", result.user);
            setMessage("Login realizado com sucesso! Bem-vindo(a).");
        } catch (error) {
            console.error("Erro no login:", error);
            setMessage(`Erro no login: ${error.message}`);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#1a1a2e' }}>
            <div style={{ background: '#252542', padding: '40px', borderRadius: '8px', width: '380px', textAlign: 'center', color: '#fff' }}>
                <h2>GPADS CODEPATH</h2>
                <p style={{ fontSize: '12px', marginBottom: '20px', color: '#a0a0c0' }}>START YOUR CODING JOURNEY</p>
                
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

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Button variant="primary" onClick={handleLogin}>
                        ENTRAR
                    </Button>
                    
                    <Button variant="secondary" onClick={handleRegister}>
                        CRIAR CONTA
                    </Button>
                </div>

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
