import { ApiClient } from "./apiClient.js";

/** Comunicação HTTP relacionada a usuários. */
export class UserApi {
    constructor(client = new ApiClient()) {
        this.client = client;
    }

    // GET /auth/me/ (perfil do usuário logado)
    async getMe() {
        return this.client.get("/auth/me/");
    }

    // GET /users/{userId}/
    async getById(id) {
        return this.client.get(`/users/${id}/`);
    }

    // PATCH /users/me/ (atualiza o avatar/item equipado do próprio usuário)
    async updateAvatar(payload) {
        return this.client.patch("/users/me/", payload);
    }
}