export declare class UpdateProgressDto {
    progressId: string;
    userId: string;
    courseId: string;
    completionPercentage: number;
    lastAccessed: Date;
}
export declare class CreateProgressDto {
    userId: string;
    courseId: string;
    completionPercentage: number;
    lastAccessed: Date;
}
