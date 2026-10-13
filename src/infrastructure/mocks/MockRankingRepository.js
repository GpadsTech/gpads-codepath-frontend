import { RankingRepository } from "../../domain/repositories/RankingRepository.js";

/**
 * Implementação falsa do RankingRepository.
 *
 * Os dados estão PROPOSITALMENTE fora de ordem, para provar
 * que o RankingService ordena por pontos e preenche a position.
 */
export class MockRankingRepository extends RankingRepository {

    async getRanking() {
        return [
            { userId: "1", name: "João", points: 700 },
            { userId: "2", name: "Maria", points: 1200 },
            { userId: "3", name: "Alane", points: 850 },
            { userId: "4", name: "Samara", points: 950 },
        ];
    }
}