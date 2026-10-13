import { ApiClient } from "./apiClient.js";

/** Comunicação HTTP relacionada aos relatórios. */
export class ReportApi {

    constructor(client = new ApiClient()) {
        this.client = client;
    }

    // GET /users/{userId}/reports  (validar com o API_CONTRACT.md)
    async getByUserId(userId) {
        return this.client.get(`/users/${userId}/reports`);
    }
}