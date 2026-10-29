/**
 * Entidade que representa uma entrega (report) de uma atividade.
 *
 * Atributos: id, studentId, challengeId, cellId, description,
 * report, code, status, submittedAt, revision, history,
 * evaluation e github.
 *
 * Status possíveis: PENDING_EVALUATION, EVALUATED, REJECTED.
 *
 * Comportamentos: isPending, isEvaluated, isRejected e
 * canResubmit (só entregas devolvidas podem ser reenviadas).
 */
export class Report {

    constructor(data) {
        this.id = data.id;
        this.studentId = data.studentId;
        this.challengeId = data.challengeId;
        this.cellId = data.cellId;
        this.description = data.description;
        this.report = data.report ?? "";
        this.code = data.code ?? "";
        this.status = data.status;
        this.submittedAt = data.submittedAt;
        this.revision = data.revision ?? 1;
        this.history = data.history ?? [];
        this.evaluation = data.evaluation ?? null;
        this.github = data.github ?? null;
    }

    isPending() {
        return this.status === "PENDING_EVALUATION";
    }

    isEvaluated() {
        return this.status === "EVALUATED";
    }

    isRejected() {
        return this.status === "REJECTED";
    }

    canResubmit() {
        return this.isRejected();
    }
}