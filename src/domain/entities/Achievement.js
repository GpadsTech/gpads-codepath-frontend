/**
 * Entidade responsável por representar uma conquista
 * dentro do sistema gamificado.
 *
 * Uma conquista é um marco que o usuário desbloqueia
 * ao atingir determinado objetivo.
 *
 * Atributos:
 *  - id:          identificador único da conquista
 *  - title:       título da conquista
 *  - description: explicação do que é preciso fazer para ganhá-la
 *  - points:      pontos concedidos ao desbloquear
 *  - progress:    andamento atual (começa em 0)
 *  - completed:   indica se já foi desbloqueada (começa em false)
 *
 * Comportamentos (previstos para a Sprint 2):
 *  - verificar se foi desbloqueada
 *  - atualizar o progresso
 *  - desbloquear ao completar o objetivo
 *
 * Responsabilidade: guardar os dados de uma conquista e,
 * futuramente, as regras ligadas ao desbloqueio dela.
 */
export class Achievement {

    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.points = data.points;
        this.progress = data.progress ?? 0;
        this.completed = data.completed ?? false;
    }

}