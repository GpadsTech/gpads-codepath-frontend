/**
 * Entidade responsável por representar um relatório
 * dentro do sistema gamificado.
 *
 * Um relatório é um resumo da participação do usuário em
 * determinado período. Alimenta as telas de relatórios
 * (ReportCard, ReportChart e ReportFilters).
 *
 * Atributos:
 *  - id:        identificador único do relatório
 *  - title:     título do relatório
 *  - startDate: início do período
 *  - endDate:   fim do período
 *  - data:      dados do resumo (formato a definir com a API)
 *
 * Comportamentos (previstos para a Sprint 2):
 *  - filtrar por período
 *  - calcular totais
 *
 * Responsabilidade: guardar os dados de um relatório.
 *
 * Observação: é a entidade mais incerta, porque depende de quais
 * relatórios o backend vai oferecer. Campos provisórios.
 */
export class Report {

    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.data = data.data ?? {};
    }

}