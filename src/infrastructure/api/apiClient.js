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
    // Faz a requisição e trata o envelope de resposta do backend.
    async request(method, path, body) {
        const options = { method, headers: await this.buildHeaders() };

        if (body !== undefined) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${BASE_URL}${path}`, options);

        // Se a resposta não for JSON válido, json fica null.
        let json = null;
        try {
            json = await response.json();
        } catch {
            json = null;
        }

        if (!response.ok || json?.success === false) {
            const error = new Error(
                json?.error?.message ?? `Erro na requisição: ${response.status}`
            );
            error.status = response.status;   // 400, 401, 403, 404, 500...
            error.code = json?.error?.code;   // ex.: FORBIDDEN, USER_NOT_FOUND
            throw error;
        }

        return json?.data;
    }

    get(path) {
        return this.request("GET", path);
    }

    post(path, body) {
        return this.request("POST", path, body);
    }

    patch(path, body) {
        return this.request("PATCH", path, body);
    }
}
