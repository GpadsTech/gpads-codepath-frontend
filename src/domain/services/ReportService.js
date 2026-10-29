import { Report } from "../entities/Report.js";

/**
 * Service responsável pelas entregas (reports).
 *
 * Operações:
 *  - getAll: busca as entregas visíveis ao usuário logado
 *    e devolve uma lista de objetos Report.
 */
export class ReportService {

    constructor(reportRepository) {
        this.reportRepository = reportRepository;
    }

    async getAll() {
        const list = await this.reportRepository.getAll();
        return list.map(item => new Report(item));
    }
}