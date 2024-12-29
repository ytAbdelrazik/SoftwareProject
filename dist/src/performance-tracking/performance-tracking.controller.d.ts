import { PerformanceTrackingService } from './performance-tracking.service';
import { UpdateProgressDto } from './dtos/update-progress.dto';
import { Response } from 'express';
export declare class PerformanceTrackingController {
    private readonly service;
    constructor(service: PerformanceTrackingService);
    createProgress(body: UpdateProgressDto): Promise<import("./progress.schema").Progress>;
    getModuleRatings(courseId: string): Promise<any[]>;
    getAllProgress(): Promise<import("./progress.schema").Progress[]>;
    getQuizPerformanceByQuizId(quizId: string): Promise<any>;
    getStudentQuizPerformance(quizId: string, userId: string): Promise<any>;
    addRating({ userId, courseId, moduleId, rating, }: {
        userId: string;
        courseId: string;
        moduleId?: string;
        rating: number;
    }): Promise<import("./modulerating.schema").Rating>;
    addInstructorRating(userId: string, instructorId: string, courseId: string, rating: number): Promise<import("./instructorrating.schema").InstructorRating>;
    getAverageRatingForCourse(courseId: string): Promise<number>;
    getAverageRatingForInstructor(instructorId: string): Promise<number>;
    getProgressByUser(userId: string): Promise<import("./progress.schema").Progress[]>;
    updateProgress(progressId: string, updateProgressDto: UpdateProgressDto): Promise<import("./progress.schema").Progress>;
    deleteProgress(progressId: string): Promise<void>;
    getStudentDashboard(studentId: string): Promise<any>;
    getCourseAnalytics(courseId: string): Promise<any>;
    exportData(courseId: string, userId: string, format: string, res: Response): Promise<void>;
}
