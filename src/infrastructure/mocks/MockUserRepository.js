import { UserRepository } from "../../domain/repositories/UserRepository.js";

/** Implementação falsa do UserRepository (formato do backend). */
export class MockUserRepository extends UserRepository {

    async getMe() {
        return this.getById("1");
    }

    async getById(id) {
        return {
            id,
            uid: "uid-" + id,
            name: "Maria",
            email: "maria@email.com",
            role: "student",
            points: 850,
            level: 8,
            cellId: "aplicacoes",
        };
    }
}