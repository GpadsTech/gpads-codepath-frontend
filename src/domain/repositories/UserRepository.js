/**
 * Contrato de acesso aos dados de usuário.
 *
 * Operações:
 *  - getMe:   busca o perfil do usuário logado
 *  - getById: busca um usuário pelo id
 *
 * Responsabilidade: ser o contrato que as implementações
 * (MockUserRepository, ApiUserRepository) devem seguir.
 */
export class UserRepository {

    async getMe() {
        throw new Error("Método getMe não implementado.");
    }

    async getById(id) {
        throw new Error("Método getById não implementado.");
    }
}