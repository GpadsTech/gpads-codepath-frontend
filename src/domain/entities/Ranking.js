/**
 * Entidade responsável por representar uma posição no ranking
 * dentro do sistema gamificado.
 *
 * Cada objeto Ranking é uma linha da classificação: um participante
 * com sua pontuação e sua colocação.
 *
 * Atributos:
 *  - userId:   identificador do usuário que ocupa a posição
 *  - name:     nome do usuário
 *  - points:   pontuação acumulada
 *  - position: colocação no ranking (1 = primeiro lugar)
 *
 * Comportamentos (previstos para a Sprint 2):
 *  - comparar pontuação com outro participante
 *
 * Responsabilidade: guardar os dados de uma posição do ranking.
 * A ordenação da lista completa fica a cargo do RankingService.
 *
 * Observação: campos provisórios, a validar com o API_CONTRACT.md.
 */
export class Ranking {

    constructor(data) {
        this.userId = data.userId;
        this.name = data.name;
        this.points = data.points ?? 0;
        this.position = data.position;
    }

}