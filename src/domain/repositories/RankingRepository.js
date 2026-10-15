/**
 * Contrato de acesso aos dados de ranking.
 *
 * Define quais operações o domínio precisa para obter o
 * ranking dos participantes, sem saber de onde os
 * dados vêm (API, mock ou outro serviço).
 *
 * Operações:
 *  - getRanking: busca a lista completa do ranking
 *
 * Responsabilidade: ser o contrato que as implementações
 * (MockRankingRepository, ApiRankingRepository) devem seguir.
 *
 * Observação: operações provisórias, a validar com o API_CONTRACT.md.
 */
export class RankingRepository{
    async getRanking(){
        throw new Error("Método getRanking não implementado.");
    }
}