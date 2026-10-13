import { ApiClient } from "./apiClient.js";

/** Comunicação HTTP relacionada ao ranking. */
export class RankingApi {

    constructor(client = new ApiClient()) {
        this.client = client;
    }

    // GET /ranking  (validar com o API_CONTRACT.md)
    async getRanking() {
        return this.client.get("/ranking");
    }
}