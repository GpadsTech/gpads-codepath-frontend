import { ApiClient } from "./apiClient.js";

/** Comunicação HTTP relacionada a usuários. */
export class UserApi {

    constructor(client = new ApiClient()) {
        this.client = client;
    }

    // GET /api/auth/me/  (perfil do usuário logado)
    async getMe() {
        return this.client.get("/auth/me/");
    }

    // GET /api/users/{userId}/
    async getById(id) {
        return this.client.get(`/users/${id}/`);
    }
}