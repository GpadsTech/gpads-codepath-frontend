/**
 * Repositório temporário utilizado durante o desenvolvimento
 * enquanto o endpoint real ainda não está disponível.
 */

export class MockUserRepository {

    async getById(id) {

        return {
            id,
            name: "Usuário Teste",
            email: "teste@gpads.com",
            points: 850,
            level: 8,
        };
    }
}