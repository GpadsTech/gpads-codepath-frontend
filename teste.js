import { MockUserRepository } from "./src/infrastructure/mocks/MockUserRepository.js";
import { MockRankingRepository } from "./src/infrastructure/mocks/MockRankingRepository.js";
import { MockReportRepository } from "./src/infrastructure/mocks/MockReportRepository.js";
import { MockAchievementRepository } from "./src/infrastructure/mocks/MockAchievementRepository.js";
import { UserService } from "./src/domain/services/UserService.js";
import { RankingService } from "./src/domain/services/RankingService.js";
import { ReportService } from "./src/domain/services/ReportService.js";
import { AchievementService } from "./src/domain/services/AchievementService.js";

console.log(await new UserService(new MockUserRepository()).getMe());
console.log(await new RankingService(new MockRankingRepository()).getRanking());
console.log(await new ReportService(new MockReportRepository()).getAll());
console.log(await new AchievementService(new MockAchievementRepository()).getByUserId("1"));