import { User } from "../entities/User.js";

/**
 * Service responsável pelas regras relacionadas ao usuário.
 *
 * Ele é o "garçom": recebe o pedido da tela, pede os dados ao
 * repository e entrega o resultado já transformado em User.
 * Não sabe se os dados vêm de um mock ou da API.
 *
 * Operações:
 *  - getUser: busca um usuário pelo id e devolve um objeto User
 *
 * Responsabilidade: aplicar as regras de negócio do usuário
 * usando o repository. Não faz fetch nem conhece o Firebase.
 */
export class UserService {

    // Recebe o repository de fora (mock ou API).
    // Assim o Service funciona com qualquer um dos dois,
    // sem precisar ser alterado quando trocarmos de um para outro.
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    // Busca um usuário pelo id.
    async getUser(id) {
        try {
            // Pede os dados ao repository e espera a resposta chegar.
            const data = await this.userRepository.getById(id);

            // Transforma o JSON cru em um objeto User,
            // que tem as regras da entidade (ex.: addPoints).
            return new User(data);
        } catch (erro) {
            // Se algo falhar na busca, registra o erro no console
            // para ajudar a descobrir o problema...
            console.error(erro);

            // ...e repassa o erro para quem chamou (Hook/tela),
            // que decide o que mostrar ao usuário (ex.: "Erro ao carregar").
            throw erro;
        }
    }
}