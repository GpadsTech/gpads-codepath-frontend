import { ApiClient } from "./apiClient.js";

/**
 * Comunicação HTTP relacionada a usuários.
 * Só sabe QUAL endpoint chamar; como fazer a chamada
 * (URL base, token, erros) é com o ApiClient.
 */
export class userApi {

    // O valor padrão cria um ApiClient se ninguém passar um.
    // Passar um client falso facilita testes.
    constructor(client = new ApiClient()) {
        this.client = client;
    }

    // GET /users/{id}  (validar com o API_CONTRACT.md)
    async getById(id) {
        return this.client.get(`/users/${id}`);
    }
}