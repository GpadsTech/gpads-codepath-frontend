import { ReportRepository } from "../../domain/repositories/ReportRepository.js";

/**
 * Implementação falsa do ReportRepository.
 *
 * O campo "data" é provisório: o formato real depende do
 * que o backend vai oferecer (validar com o API_CONTRACT.md).
 */
export class MockReportRepository extends ReportRepository {

    async getByUserId(userId) {
        return [
            {
                id: "1",
                title: "Semana 1",
                startDate: "2026-10-05",
                endDate: "2026-10-11",
                data: { pointsEarned: 200, challengesCompleted: 3 },
            },
            {
                id: "2",
                title: "Semana 2",
                startDate: "2026-10-12",
                endDate: "2026-10-18",
                data: { pointsEarned: 150, challengesCompleted: 2 },
            },
        ];
    }
}