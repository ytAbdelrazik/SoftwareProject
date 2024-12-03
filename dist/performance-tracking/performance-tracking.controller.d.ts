import { PerformanceTrackingService } from './performance-tracking.service';
import { UpdateProgressDto } from './dtos/update-progress.dto';
export declare class PerformanceTrackingController {
    private readonly service;
    constructor(service: PerformanceTrackingService);
    createProgress(body: any): Promise<import("./progress.schema").Progress>;
    getAllProgress(): Promise<import("./progress.schema").Progress[]>;
    getProgressByUser(userId: string): Promise<import("./progress.schema").Progress[]>;
    updateProgress(progressId: string, updateProgressDto: UpdateProgressDto): Promise<import("./progress.schema").Progress>;
    deleteProgress(progressId: string): Promise<void>;
}
