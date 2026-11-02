import { ApiClient } from "./apiClient.js";

/** Comunicação HTTP relacionada ao ranking. */
export class RankingApi {

    constructor(client = new ApiClient()) {
        this.client = client;
    }

    // GET /api/ranking/?period=all|week
    async getRanking(period = "all") {
        return this.client.get(`/ranking/?period=${period}`);
    }
}