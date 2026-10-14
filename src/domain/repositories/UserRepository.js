/**
 * Contrato de acesso aos dados de usuário.
 *
 * Define quais operações o domínio precisa para obter usuários,
 * sem saber de onde os dados vêm (API, mock ou outro serviço).
 *
 * Operações:
 *  - getById: busca um usuário pelo id
 *
 * Responsabilidade: ser o contrato que as implementações
 * (MockUserRepository, ApiUserRepository) devem seguir.
 *
 * Observação: operações provisórias, a validar com o API_CONTRACT.md.
 */
export class UserRepository {

    async getById(id) {
        throw new Error("Método getById não implementado.");
    }

}