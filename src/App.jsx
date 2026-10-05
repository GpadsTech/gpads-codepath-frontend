import { useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  observeAuthState,
} from "./infrastructure/firebase/firebaseAuth";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  // Observa se existe usuário autenticado
  useEffect(() => {
    const unsubscribe = observeAuthState((currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  const handleRegister = async () => {
    try {
      setMessage("");

      const result = await registerUser(email, password);

      console.log("Usuário criado:", result.user);

      setMessage("Usuário criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);

      setMessage(`Erro: ${error.message}`);
    }
  };

  const handleLogin = async () => {
    try {
      setMessage("");

      const result = await loginUser(email, password);

      console.log("Login realizado:", result.user);

      setMessage("Login realizado com sucesso!");
    } catch (error) {
      console.error("Erro no login:", error);

      setMessage(`Erro: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();

      setMessage("Logout realizado.");
    } catch (error) {
      console.error("Erro no logout:", error);

      setMessage(`Erro: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>GPADS — Teste Firebase</h1>

      {user ? (
        <div>
          <h2>Usuário autenticado ✅</h2>

          <p>
            <strong>E-mail:</strong> {user.email}
          </p>

          <p>
            <strong>UID:</strong> {user.uid}
          </p>

          <button onClick={handleLogout}>
            Sair
          </button>
        </div>
      ) : (
        <div style={{ maxWidth: "400px" }}>
          <h2>Login</h2>

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <button onClick={handleLogin}>
            Entrar
          </button>

          <button
            onClick={handleRegister}
            style={{ marginLeft: "10px" }}
          >
            Criar conta
          </button>
        </div>
      )}

      {message && (
        <p style={{ marginTop: "20px" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default App;