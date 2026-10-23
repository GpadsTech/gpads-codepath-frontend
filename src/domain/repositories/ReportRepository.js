/**
 * Contrato de acesso aos dados de entregas (reports).
 *
 * Operações:
 *  - getAll: busca as entregas visíveis ao usuário logado
 *
 * Responsabilidade: ser o contrato que as implementações
 * (MockReportRepository, ApiReportRepository) devem seguir.
 */
export class ReportRepository {

    async getAll() {
        throw new Error("Método getAll não implementado.");
    }
}