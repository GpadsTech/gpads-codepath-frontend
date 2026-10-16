import { Achievement } from "../entities/Achievement.js";

/**
 * Service responsável pelas regras relacionadas às conquistas.
 *
 * Pede as conquistas de um usuário ao repository e entrega
 * a lista já transformada em objetos Achievement. Não sabe se
 * os dados vêm de um mock ou da API.
 *
 * Operações:
 *  - getByUserId: busca as conquistas de um usuário
 *
 * Responsabilidade: intermediar o acesso às conquistas.
 * Elas são pessoais: cada usuário vê apenas as suas, por isso
 * a busca é feita pelo id do usuário.
 */
export class AchievementService {

    // Recebe o repository de fora (mock ou API), para o Service
    // funcionar com qualquer um dos dois sem ser alterado.
    constructor(achievementRepository) {
        this.achievementRepository = achievementRepository;
    }

    // Busca as conquistas de um usuário.
    async getByUserId(userId) {
        // Pede os dados ao repository e espera a resposta.
        const list = await this.achievementRepository.getByUserId(userId);

        // Transforma cada item da lista (JSON cru) em um Achievement.
        return list.map(item => new Achievement(item));
    }
}