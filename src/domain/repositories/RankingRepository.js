/**
 * Contrato de acesso aos dados de ranking.
 *
 * Operações:
 *  - getRanking: busca o ranking completo ("all") ou da semana ("week")
 *
 * Responsabilidade: ser o contrato que as implementações
 * (MockRankingRepository, ApiRankingRepository) devem seguir.
 */
export class RankingRepository {

    async getRanking(_period = "all") {
        throw new Error("Método getRanking não implementado.");
    }
}