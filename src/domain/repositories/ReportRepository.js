/**
 * Contrato de acesso aos dados de report.
 *
 * Define quais operações o domínio precisa para obter a
 * classificação dos participantes, sem saber de onde os
 * dados vêm (API, mock ou outro serviço).
 *
 * Operações:
 *  - getByUserId: busca na lista os usuarios pelo ID.
 *
 * Responsabilidade: ser o contrato que as implementações
 * (MockRankingRepository, ApiRankingRepository) devem seguir.
 *
 * Observação: operações provisórias, a validar com o API_CONTRACT.md.
 */

export class ReportRepository{
    async getByUserId(userId) {
        throw new Error("Método getByUserId não implementado.");
    }
}