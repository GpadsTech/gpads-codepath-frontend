import { auth } from "../firebase/firebaseConfig.js";

// URL base da API, vinda do arquivo .env (VITE_API_URL).
// O Vite só expõe variáveis que começam com VITE_.
const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Cliente HTTP central do frontend.
 *
 * Todas as chamadas à API passam por aqui, então só existe
 * UM lugar que sabe: a URL base, o token de autenticação
 * e como tratar erros de resposta.
 *
 * Responsabilidade: fazer a requisição, enviar o Firebase ID Token
 * no header Authorization e devolver o JSON da resposta.
 */
export class ApiClient {

    // Monta os headers de toda requisição.
    async buildHeaders() {
        const headers = { "Content-Type": "application/json" };

        // currentUser é o usuário logado no Firebase (ou null).
        const user = auth.currentUser;

        if (user) {
            // Pede o ID Token ao Firebase (ele renova sozinho se expirou).
            const token = await user.getIdToken();

            // Formato exigido: "Bearer " + token.
            headers.Authorization = `Bearer ${token}`;
        }

        return headers;
    }

    // Faz um GET no caminho informado (ex.: "/users/123").
    async get(path) {
        const response = await fetch(`${BASE_URL}${path}`, {
            method: "GET",
            headers: await this.buildHeaders(),
        });

        // fetch NÃO lança erro em 404 ou 500; precisamos checar
        // response.ok (true para status 200 a 299) e lançar nós mesmas.
        if (!response.ok) {
            const error = new Error(`Erro na requisição: ${response.status}`);
            // Guarda o status para o tratamento de 400/401/403/404/500
            // previsto para o dia 24/10.
            error.status = response.status;
            throw error;
        }

        return await response.json();
    }
}