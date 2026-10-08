import { Report } from "../entities/Report.js";

/**
 * Service responsável pelas regras relacionadas aos relatórios.
 *
 * Pede os relatórios de um usuário ao repository e entrega
 * a lista já transformada em objetos Report. Não sabe se os
 * dados vêm de um mock ou da API.
 *
 * Operações:
 *  - getByUserId: busca os relatórios de um usuário
 *
 * Responsabilidade: intermediar o acesso aos relatórios,
 * sem fazer fetch nem conhecer o Firebase.
 */
export class ReportService {

    // Recebe o repository de fora (mock ou API), para o Service
    // funcionar com qualquer um dos dois sem ser alterado.
    constructor(reportRepository) {
        this.reportRepository = reportRepository;
    }

    // Busca os relatórios de um usuário.
    async getByUserId(userId) {
        // Pede os dados ao repository e espera a resposta.
        const lista = await this.reportRepository.getByUserId(userId);

        // Transforma cada item da lista (JSON cru) em um Report.
        return lista.map(item => new Report(item));
    }
}