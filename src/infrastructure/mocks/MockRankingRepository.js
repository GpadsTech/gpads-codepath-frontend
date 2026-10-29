import { RankingRepository } from "../../domain/repositories/RankingRepository.js";

/**
 * Implementação falsa do RankingRepository.
 * Como o backend, já devolve ordenado e com position.
 * Note o empate: posições 1, 1, 3.
 */
export class MockRankingRepository extends RankingRepository {

    async getRanking(_period = "all") {
        return [
            { position: 1, userId: "2", name: "Maria", points: 1200, level: 12 },
            { position: 1, userId: "4", name: "Samara", points: 1200, level: 12 },
            { position: 3, userId: "3", name: "Alane", points: 850, level: 8 },
            { position: 4, userId: "1", name: "João", points: 700, level: 7 },
        ];
    }
}