import { RecommendationService } from './recommendation.service';
export declare class RecommendationController {
    private readonly recommendationService;
    constructor(recommendationService: RecommendationService);
    createRecommendation(userId: string, recommendedItems: string[]): Promise<import("./recommendation.schema").Recommendation>;
}
