import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./infrastructure/firebase/firebaseConfig.js";
import { UserRepository } from "./domain/repositories/UserRepository.js";
import { RankingRepository } from "./domain/repositories/RankingRepository.js";
import { ReportRepository } from "./domain/repositories/ReportRepository.js";
import { UserApi } from "./infrastructure/api/userApi.js";
import { RankingApi } from "./infrastructure/api/rankingApi.js";
import { ReportApi } from "./infrastructure/api/reportApi.js";
import { UserService } from "./domain/services/UserService.js";
import { RankingService } from "./domain/services/RankingService.js";
import { ReportService } from "./domain/services/ReportService.js";

// Componente TEMPORÁRIO para testar a integração com a API real.
// Não commitar.

// Repositories reais, só para o teste (ligam o contrato à *Api).
class ApiUserRepository extends UserRepository {
    api = new UserApi();
    getMe() { return this.api.getMe(); }
    getById(id) { return this.api.getById(id); }
}

class ApiRankingRepository extends RankingRepository {
    api = new RankingApi();
    getRanking(period = "all") { return this.api.getRanking(period); }
}

class ApiReportRepository extends ReportRepository {
    api = new ReportApi();
    getAll() { return this.api.getAll(); }
}

export default function TesteApi() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [logada, setLogada] = useState(false);
    const [resultado, setResultado] = useState({});
    const [erro, setErro] = useState("");

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => setLogada(!!user));
    }, []);

    async function entrar() {
        setErro("");
        try {
            await signInWithEmailAndPassword(auth, email.trim(), senha);
        } catch (e) {
            setErro(`Login falhou: ${e.code}`);
        }
    }

    async function testar(nome, chamada) {
        try {
            const dados = await chamada();
            console.log(nome, dados);
            setResultado((r) => ({ ...r, [nome]: dados }));
        } catch (e) {
            console.error(nome, "ERRO:", e.status, e.code, e.message);
            setResultado((r) => ({
                ...r,
                [nome]: { erro: true, status: e.status, code: e.code, message: e.message },
            }));
        }
    }

    async function rodarTestes() {
        setResultado({});
        await testar("ME", () => new UserService(new ApiUserRepository()).getMe());
        await testar("RANKING", () => new RankingService(new ApiRankingRepository()).getRanking());
        await testar("REPORTS", () => new ReportService(new ApiReportRepository()).getAll());
    }

    return (
        <div style={{ padding: 24, color: "white", maxWidth: 720 }}>
            <h2>Teste da API</h2>

            {!logada ? (
                <div style={{ display: "grid", gap: 8, maxWidth: 320 }}>
                    <input placeholder="e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input placeholder="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    <button onClick={entrar}>Entrar</button>
                    {erro && <p style={{ color: "salmon" }}>{erro}</p>}
                </div>
            ) : (
                <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={rodarTestes}>Rodar testes</button>
                    <button onClick={() => signOut(auth)}>Sair</button>
                </div>
            )}

            <pre style={{ marginTop: 16, whiteSpace: "pre-wrap" }}>
                {JSON.stringify(resultado, null, 2)}
            </pre>
        </div>
    );
}