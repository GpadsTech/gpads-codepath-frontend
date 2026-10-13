import { UserRepository } from "../../domain/repositories/UserRepository.js";

/**
 * Implementação falsa do UserRepository, para desenvolver
 * o frontend sem depender da API real.
 *
 * "extends UserRepository" significa que ela segue o contrato:
 * tem o método getById, igual ao que a API real terá.
 * Quando a API ficar pronta, trocamos este mock pelo
 * ApiUserRepository e o Service nem percebe a diferença.
 */
export class MockUserRepository extends UserRepository {

    // Devolve sempre o mesmo usuário inventado,
    // usando o id que foi pedido.
    async getById(id) {
        return {
            id,
            name: "Maria",
            email: "maria@email.com",
            points: 850,
            level: 8,
        };
    }
}