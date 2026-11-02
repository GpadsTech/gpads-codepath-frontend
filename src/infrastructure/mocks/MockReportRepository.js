import { ReportRepository } from "../../domain/repositories/ReportRepository.js";

/** Implementação falsa do ReportRepository (formato do backend). */
export class MockReportRepository extends ReportRepository {

    async getAll() {
        return [
            {
                id: "r1",
                studentId: "uid-1",
                challengeId: "c1",
                cellId: "aplicacoes",
                description: "Entrega do ranking",
                report: "Texto do relatório",
                code: "",
                status: "EVALUATED",
                submittedAt: "2026-10-19T22:00:00Z",
                revision: 1,
                history: [],
                evaluation: { decision: "approve", points: 85, feedback: "Bom trabalho" },
                github: null,
            },
            {
                id: "r2",
                studentId: "uid-1",
                challengeId: "c2",
                cellId: "aplicacoes",
                description: "Entrega do dashboard",
                report: "Texto",
                code: "",
                status: "REJECTED",
                submittedAt: "2026-10-20T10:00:00Z",
                revision: 1,
                history: [],
                evaluation: { decision: "reject", feedback: "Inclua os testes e reenvie." },
                github: null,
            },
        ];
    }
}