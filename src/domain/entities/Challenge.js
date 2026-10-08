/**
 * Entidade responsável por representar um desafio
 * dentro do sistema gamificado.
 *
 * Um desafio é uma tarefa que o usuário está cumprindo para
 * ganhar pontos. Diferente da conquista (que já foi ganha),
 * o desafio tem andamento.
 *
 * Atributos:
 *  - id:          identificador único do desafio
 *  - title:       título do desafio
 *  - description: o que precisa ser feito
 *  - points:      pontos concedidos ao concluir
 *  - progress:    andamento de 0 a 100 (começa em 0)
 *  - completed:   indica se foi concluído (começa em false)
 *
 * Comportamentos:
 *  - updateProgress: atualiza o andamento e conclui o desafio ao chegar em 100
 *
 * Responsabilidade: guardar os dados de um desafio e as regras
 * de andamento e conclusão dele.
 *
 * Observação: campos provisórios, a validar com o API_CONTRACT.md.
 */
export class Challenge {

    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.points = data.points;
        this.progress = data.progress ?? 0;
        this.completed = data.completed ?? false;
    }

    updateProgress(value) {
        // Math.min garante que o progresso nunca passe de 100
        // Math.max garante que nunca fique abaixo de 0
        this.progress = Math.min(100, Math.max(0, value));

        if (this.progress === 100) {
            this.completed = true;
        }
    }

}