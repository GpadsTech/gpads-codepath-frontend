import { useState } from "react";
import { loginUser, registerUser } from "../../infrastructure/firebase/firebaseAuth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            const result = await registerUser(email, password);

            console.log("Usuário criado:", result.user);

        } catch (error) {
            console.error("Erro ao criar usuário:", error);
        }
    };

    const handleLogin = async () => {
        try {
            const result = await loginUser(email, password);

            console.log("Login realizado:", result.user);

        } catch (error) {
            console.error("Erro no login:", error);
        }
    };

    return (
        <div>
            <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleRegister}>
                Criar conta
            </button>

            <button onClick={handleLogin}>
                Entrar
            </button>
        </div>
    );
}

export default Login;