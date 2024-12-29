import { Model } from 'mongoose';
import { Recommendation, RecommendationDocument } from './recommendation.schema';
export declare class RecommendationService {
    private recommendationModel;
    constructor(recommendationModel: Model<RecommendationDocument>);
    createRecommendation(userId: string, recommendedItems: string[]): Promise<Recommendation>;
}
