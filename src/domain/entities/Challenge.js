/**
 * Entidade que representa uma atividade (challenge) do sistema.
 *
 * Atributos: id, title, description, createdAt, status
 * ("active" ou "inactive"), difficulty ("easy", "medium", "hard"),
 * cellId (null = atividade global) e points.
 *
 * Observação: points é um dado legado e não é concedido
 * automaticamente. A pontuação real vem da avaliação da entrega.
 */
export class Challenge {

    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.createdAt = data.createdAt;
        this.status = data.status ?? "active";
        this.difficulty = data.difficulty ?? "medium";
        this.cellId = data.cellId ?? null;
        this.points = data.points ?? 0;
    }

    isActive() {
        return this.status === "active";
    }
}