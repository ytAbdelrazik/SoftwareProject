import { Model } from 'mongoose';
import { Progress } from './progress.schema';
import { UpdateProgressDto } from './dtos/update-progress.dto';
export declare class PerformanceTrackingService {
    private readonly progressModel;
    constructor(progressModel: Model<Progress>);
    createProgress(data: any): Promise<Progress>;
    getAllProgress(): Promise<Progress[]>;
    getProgressByUser(userId: string): Promise<Progress[]>;
    updateProgress(progressId: string, updateProgressDto: UpdateProgressDto): Promise<Progress>;
    deleteProgress(progressId: string): Promise<void>;
}
