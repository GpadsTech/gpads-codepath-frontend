/**
 * Entidade que representa uma linha do ranking.
 *
 * Atributos: position, userId, name, points, level.
 *
 * Observação: a posição vem pronta do backend (em empate,
 * a contagem é 1, 1, 3). O frontend não deve recalculá-la.
 */
export class Ranking {

    constructor(data) {
        this.position = data.position;
        this.userId = data.userId;
        this.name = data.name;
        this.points = data.points ?? 0;
        this.level = data.level ?? 1;
    }

    // Verdadeiro se este participante tem mais pontos que o outro.
    isAheadOf(other) {
        return this.points > other.points;
    }
}