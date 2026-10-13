import { AchievementRepository } from "../../domain/repositories/AchievementRepository.js";

/**
 * Implementação falsa do AchievementRepository.
 *
 * Mistura conquistas concluídas, em andamento e sem
 * progresso informado, para testar os valores padrão
 * da entidade (progress = 0, completed = false).
 */
export class MockAchievementRepository extends AchievementRepository {

    // O userId é recebido porque o contrato pede,
    // mas o mock devolve a mesma lista para qualquer usuário.
    async getByUserId(userId) {
        return [
            {
                id: "1",
                title: "Primeiro login",
                description: "Entrou no sistema pela primeira vez",
                points: 10,
                progress: 100,
                completed: true,
            },
            {
                id: "2",
                title: "5 atividades",
                description: "Conclua 5 atividades",
                points: 50,
                progress: 60,
                completed: false,
            },
            {
                id: "3",
                title: "Nível 10",
                description: "Chegue ao nível 10",
                points: 100,
                // sem progress e completed: a entidade usa os padrões
            },
        ];
    }
}