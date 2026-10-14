import { ApiClient } from "./apiClient.js";

/** Comunicação HTTP relacionada às conquistas. */
export class AchievementApi {

    constructor(client = new ApiClient()) {
        this.client = client;
    }

    // GET /users/{userId}/achievements  (validar com o API_CONTRACT.md)
    async getByUserId(userId) {
        return this.client.get(`/users/${userId}/achievements`);
    }
}