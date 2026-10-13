/**
 * Entidade responsável por representar um usuário
 * dentro do sistema gamificado.
 *
 * Contém os dados e comportamentos relacionados
 * à evolução do usuário.
 *
 * Atributos:
 *  - id:     identificador único do usuário
 *  - name:   nome do usuário
 *  - email:  e-mail do usuário
 *  - points: pontuação acumulada (começa em 0)
 *  - level:  nível atual (começa em 1)
 *
 * Comportamentos:
 *  - addPoints: soma pontos à pontuação do usuário
 *
 * Responsabilidade: guardar os dados do usuário e as regras
 * ligadas à evolução dele. Não sabe nada de API ou Firebase.
 *
 * Observação: a regra de cálculo de nível será definida
 * na Sprint 2, junto com o backend.
 */
export class User {

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.points = data.points ?? 0;
        this.level = data.level ?? 1;
    }

    addPoints(points) {
        this.points += points;
    }

}