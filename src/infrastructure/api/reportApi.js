import { ApiClient } from "./apiClient.js";

/** Comunicação HTTP relacionada às entregas (reports). */
export class ReportApi {

    constructor(client = new ApiClient()) {
        this.client = client;
    }

    // GET /api/reports/
    async getAll() {
        return this.client.get("/reports/");
    }

    // GET /api/reports/{reportId}/
    async getById(id) {
        return this.client.get(`/reports/${id}/`);
    }
}