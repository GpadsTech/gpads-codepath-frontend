import { Ranking } from "../entities/Ranking.js";

/**
 * Service responsável pelas regras do ranking.
 *
 * Pede a lista de participantes ao repository, ordena por
 * pontuação e preenche a posição de cada um. Não sabe se os
 * dados vêm de um mock ou da API.
 *
 * Operações:
 *  - getRanking: devolve o ranking completo, do 1º ao último
 *
 * Responsabilidade: ordenar o ranking e definir a posição de
 * cada participante (regra que a entidade Ranking não faz).
 */
export class RankingService {

  // Recebe o repository de fora (mock ou API), para o Service
  // funcionar com qualquer um dos dois sem ser alterado.
  constructor(rankingRepository) {
    this.rankingRepository = rankingRepository;
  }

  // Lista o ranking completo, ordenado por pontos.
  async getRanking(period = "all") {
    // Pede os dados ao repository e espera a resposta.
    const list = await this.rankingRepository.getRanking(period);

    // Copia a lista antes de ordenar, para não alterar a original.
    // "b.points - a.points" deixa quem tem mais pontos primeiro.
    const sorted = [...list].sort((a, b) => b.points - a.points);

    // Cria um Ranking para cada item, preenchendo a posição.
    // O index começa em 0, por isso somamos 1 (1º lugar = posição 1).
    return sorted.map((item, index) =>
      new Ranking({ ...item, position: item.position ?? index + 1 })
    );
  }
  async getRanking(period = "all") {
    const list = await this.rankingRepository.getRanking(period);

    // 1º Nível | 2º Pontos | 3º Nome em Ordem Alfabética (A-Z)
    const sorted = [...list].sort((a, b) => {
      if ((b.level || 0) !== (a.level || 0)) {
        return (b.level || 0) - (a.level || 0);
      }
      if ((b.points || 0) !== (a.points || 0)) {
        return (b.points || 0) - (a.points || 0);
      }
      return (a.name || "").localeCompare(b.name || "", "pt-BR");
    });

    // Reatribui posições ordinais (1, 2, 3...) sem repetição errada
    return sorted.map((item, index) =>
      new Ranking({ ...item, position: index + 1 })
    );
  }
}