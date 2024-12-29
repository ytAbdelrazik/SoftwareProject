"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PerformanceTrackingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceTrackingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const fs = require("fs");
const path = require("path");
const csvWriter = require("csv-writer");
const progress_schema_1 = require("./progress.schema");
const user_interaction_schema_1 = require("../recommedation-engine/user-interaction.schema");
const responses_schema_1 = require("../interactive-modules/responses.schema");
const course_schema_1 = require("../course-management/course.schema");
const module_schema_1 = require("../course-management/module.schema");
const quizzes_schema_1 = require("../interactive-modules/quizzes.schema");
const users_schema_1 = require("../user-managment/users.schema");
const modulerating_schema_1 = require("./modulerating.schema");
const instructorrating_schema_1 = require("./instructorrating.schema");
let PerformanceTrackingService = PerformanceTrackingService_1 = class PerformanceTrackingService {
    constructor(progressModel, userInteractionModel, courseModel, moduleModel, quizModel, responseModel, userModel, ratingModel, instructorRatingModel) {
        this.progressModel = progressModel;
        this.userInteractionModel = userInteractionModel;
        this.courseModel = courseModel;
        this.moduleModel = moduleModel;
        this.quizModel = quizModel;
        this.responseModel = responseModel;
        this.userModel = userModel;
        this.ratingModel = ratingModel;
        this.instructorRatingModel = instructorRatingModel;
        this.logger = new common_1.Logger(PerformanceTrackingService_1.name);
    }
    async getProgressByUser(userId) {
        const progress = await this.progressModel.find({ userId }).exec();
        if (progress.length === 0) {
            throw new common_1.NotFoundException('No progress found for this user.');
        }
        return progress;
    }
    async updateProgress(progressId, updateProgressDto) {
        const progress = await this.progressModel.findOneAndUpdate({ progressId }, { $set: updateProgressDto }, { new: true }).exec();
        if (!progress) {
            throw new common_1.NotFoundException('Progress not found to update.');
        }
        return progress;
    }
    async deleteProgress(progressId) {
        const result = await this.progressModel.findOneAndDelete({ progressId }).exec();
        if (!result) {
            throw new common_1.NotFoundException('Progress not found to delete.');
        }
    }
    async addRating(userId, courseId, moduleId, rating) {
        const userExists = await this.userModel.exists({ userId });
        if (!userExists) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found.`);
        }
        const courseExists = await this.courseModel.exists({ courseId });
        if (!courseExists) {
            throw new common_1.NotFoundException(`Course with ID ${courseId} not found.`);
        }
        if (moduleId) {
            const moduleExists = await this.moduleModel.exists({ moduleId });
            if (!moduleExists) {
                throw new common_1.NotFoundException(`Module with ID ${moduleId} not found.`);
            }
        }
        const newRating = new this.ratingModel({ userId, courseId, moduleId, rating });
        return newRating.save();
    }
    async getAverageRatingForCourse(courseId) {
        const result = await this.ratingModel.aggregate([
            {
                $lookup: {
                    from: 'modules',
                    localField: 'moduleId',
                    foreignField: 'moduleId',
                    as: 'module',
                },
            },
            { $unwind: '$module' },
            { $match: { 'module.courseId': courseId } },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: '$rating' },
                },
            },
        ]);
        if (!result.length) {
            throw new common_1.NotFoundException('No ratings found for this course.');
        }
        return result[0].averageRating;
    }
    async getModuleRatings(courseId) {
        const result = await this.ratingModel.aggregate([
            {
                $lookup: {
                    from: 'modules',
                    localField: 'moduleId',
                    foreignField: 'moduleId',
                    as: 'module',
                },
            },
            { $unwind: '$module' },
            {
                $match: {
                    'module.courseId': courseId
                },
            },
            {
                $group: {
                    _id: '$moduleId',
                    averageRating: { $avg: '$rating' },
                },
            },
        ]);
        return result;
    }
    async addInstructorRating(userId, instructorId, courseId, rating) {
        const ratingUser = await this.userModel.findOne({ userId });
        if (!ratingUser) {
            throw new common_1.NotFoundException('User not found.');
        }
        const instructor = await this.userModel.findOne({ userId: instructorId });
        if (!instructor || instructor.role !== 'instructor') {
            throw new common_1.NotFoundException('Instructor not found.');
        }
        if (ratingUser.role !== 'student') {
            throw new common_1.BadRequestException('Only students can rate instructors.');
        }
        const existingRating = await this.instructorRatingModel.findOne({
            userId,
            instructorId,
        });
        if (existingRating) {
            throw new common_1.BadRequestException('You have already rated this instructor.');
        }
        const newRating = new this.instructorRatingModel({
            userId,
            instructorId,
            courseId,
            rating,
        });
        return newRating.save();
    }
    async getAverageRatingForInstructor(instructorId) {
        console.log('Searching for ratings with instructorId:', instructorId);
        const result = await this.instructorRatingModel.aggregate([
            {
                $match: { instructorId: instructorId },
            },
            {
                $group: {
                    _id: '$instructorId',
                    averageRating: { $avg: '$rating' },
                },
            },
        ]);
        console.log('Query result:', result);
        if (!result.length) {
            throw new common_1.NotFoundException('No ratings found for this instructor.');
        }
        return result[0].averageRating;
    }
    async createProgress(progressDto) {
        const { userId, courseId } = progressDto;
        const existingProgress = await this.progressModel.findOne({ userId, courseId }).exec();
        if (existingProgress) {
            throw new common_1.ConflictException('Progress already exists for this course and user.');
        }
        const interaction = await this.userInteractionModel.findOne({ userId, courseId }).exec();
        if (!interaction) {
            const course = await this.courseModel.findOne({ courseId: courseId }).exec();
            if (!course) {
                throw new common_1.NotFoundException('Course not found. Please verify the course ID.');
            }
            const progress = new this.progressModel({
                ...progressDto,
                completionPercentage: 0,
                lastAccessed: new Date(),
            });
            return progress.save();
        }
        throw new common_1.HttpException('Unexpected error occurred while creating progress.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async getAllProgress() {
        const progress = await this.progressModel.find().exec();
        if (!progress.length) {
            throw new common_1.NotFoundException('No progress records found.');
        }
        return progress;
    }
    async getQuizPerformanceByQuizId(quizId) {
        const quizScores = await this.responseModel.aggregate([
            { $match: { quizId: quizId } },
            {
                $group: {
                    _id: '$quizId',
                    totalResponses: { $count: {} },
                    averageScore: { $avg: '$score' },
                    highestScore: { $max: '$score' },
                    lowestScore: { $min: '$score' },
                },
            },
        ]);
        if (!quizScores.length) {
            throw new common_1.NotFoundException('No responses found for this quiz.');
        }
        return quizScores[0];
    }
    async getStudentQuizPerformance(quizId, userId) {
        const studentScore = await this.responseModel.findOne({ quizId, userId }).exec();
        if (!studentScore) {
            throw new common_1.NotFoundException('No response found for this quiz and student.');
        }
        return {
            quizId,
            userId,
            score: studentScore.score,
            submittedAt: studentScore.submittedAt,
        };
    }
    async getStudentDashboard(studentId) {
        const progressData = await this.progressModel.find({ userId: studentId }).exec();
        if (!progressData.length) {
            throw new common_1.NotFoundException('No progress data found for this student.');
        }
        const courseCompletions = progressData.map((progress) => ({
            courseId: progress.courseId,
            completionPercentage: progress.completionPercentage,
            lastAccessed: progress.lastAccessed,
        }));
        const allScores = await this.userInteractionModel.find({ userId: studentId }).exec();
        const averageScore = allScores.reduce((sum, interaction) => sum + (interaction.score || 0), 0) / allScores.length;
        const quizzes = await this.responseModel.find({ userId: studentId }).exec();
        const quizPerformances = quizzes.map((quiz) => ({
            quizId: quiz.quizId,
            score: quiz.score,
            submittedAt: quiz.submittedAt,
        }));
        return {
            studentId,
            courseCompletions,
            averageScore: Number(averageScore.toFixed(2)),
            quizPerformances,
        };
    }
    async exportAnalytics(courseId, userId, format, res) {
        try {
            console.log('Starting export for courseId:', courseId, 'userId:', userId, 'format:', format);
            const data = await this.getCourseAnalytics(courseId);
            console.log('Course Analytics:', data);
            let averageCourseRating = 'Rating not found';
            let moduleRatings = 'Rating not found';
            let averageInstructorRating = 'Rating not found';
            try {
                averageCourseRating = String(await this.getAverageRatingForCourse(courseId));
                console.log(`Average Course Rating for ${courseId}:`, averageCourseRating);
            }
            catch (error) {
                console.error(`Error fetching course rating for courseId ${courseId}:`, error);
            }
            try {
                const moduleRatingData = await this.getModuleRatings(courseId);
                moduleRatings = moduleRatingData
                    .map((module) => `Module ${module._id}: ${module.averageRating}`)
                    .join(', ');
                console.log('Module Ratings:', moduleRatings);
            }
            catch (error) {
                console.error(`Error fetching module ratings for courseId ${courseId}:`, error);
            }
            try {
                averageInstructorRating = String(await this.getAverageRatingForInstructor(userId));
                console.log(`Instructor Rating for ${userId}:`, averageInstructorRating);
            }
            catch (error) {
                console.error(`Error fetching instructor rating for userId ${userId}:`, error);
            }
            data.averageCourseRating = averageCourseRating;
            data.moduleRatings = moduleRatings;
            data.averageInstructorRating = averageInstructorRating;
            console.log('Final Data for Export:', data);
            const customDirectory = '/Users/hamzarateb/UNIVERSITY/SoftwareProject/SoftwareProject/src/performance-tracking/dtos';
            const fileName = `${courseId}-analytics-${Date.now()}.csv`;
            const csvPath = path.join(customDirectory, fileName);
            console.log('CSV Path:', csvPath);
            const csv = csvWriter.createObjectCsvWriter({
                path: csvPath,
                header: [
                    { id: '_id', title: 'Course ID' },
                    { id: 'averageCompletion', title: 'Average Completion (%)' },
                    { id: 'activeStudents', title: 'Active Students' },
                    { id: 'averageCourseRating', title: 'Average Course Rating' },
                    { id: 'averageInstructorRating', title: 'Average Instructor Rating' },
                    { id: 'performanceCategories.belowAverage', title: 'Students Below Average' },
                    { id: 'performanceCategories.average', title: 'Students Average' },
                    { id: 'performanceCategories.aboveAverage', title: 'Students Above Average' },
                    { id: 'performanceCategories.excellent', title: 'Students Excellent' },
                    { id: 'moduleRatings', title: 'Module Ratings' },
                ],
            });
            console.log('Writing data to CSV...');
            await csv.writeRecords([data]);
            console.log('Data written to CSV. File path:', csvPath);
            res.download(csvPath, fileName, (err) => {
                if (err) {
                    console.error('Error during file download:', err);
                    if (!res.headersSent) {
                        res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while exporting the file.' });
                    }
                }
                else {
                    console.log('File download complete. Cleaning up file...');
                    fs.unlinkSync(csvPath);
                    console.log('File deleted:', csvPath);
                }
            });
            return;
        }
        catch (error) {
            console.error('Error exporting analytics:', error);
            if (!res.headersSent) {
                res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while exporting analytics.' });
            }
        }
    }
    async getCourseAnalytics(courseId) {
        const interactions = await this.userInteractionModel.find({ courseId }).exec();
        const studentsCompletedCourse = await this.progressModel
            .find({ courseId, completionRate: 100 })
            .distinct('userId')
            .exec();
        const studentScores = interactions.reduce((acc, interaction) => {
            if (!acc[interaction.userId]) {
                acc[interaction.userId] = [];
            }
            acc[interaction.userId].push(interaction.score);
            return acc;
        }, {});
        const performanceCategories = {
            belowAverage: 0,
            average: 0,
            aboveAverage: 0,
            excellent: 0,
        };
        const totalStudents = Object.keys(studentScores).length;
        const scores = interactions.map((interaction) => interaction.score);
        const totalScores = scores.reduce((sum, score) => sum + score, 0);
        const overallAverageScore = totalScores / interactions.length;
        for (const userId in studentScores) {
            const scores = studentScores[userId];
            const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
            if (averageScore < 60) {
                performanceCategories.belowAverage++;
            }
            else if (averageScore >= 60 && averageScore < 80) {
                performanceCategories.average++;
            }
            else if (averageScore >= 80 && averageScore < 90) {
                performanceCategories.aboveAverage++;
            }
            else {
                performanceCategories.excellent++;
            }
        }
        return {
            courseId,
            totalStudents,
            studentsCompletedCourse: studentsCompletedCourse.length,
            performanceCategories,
        };
    }
};
exports.PerformanceTrackingService = PerformanceTrackingService;
exports.PerformanceTrackingService = PerformanceTrackingService = PerformanceTrackingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(progress_schema_1.Progress.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_interaction_schema_1.UserInteraction.name)),
    __param(2, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __param(3, (0, mongoose_1.InjectModel)(module_schema_1.Module.name)),
    __param(4, (0, mongoose_1.InjectModel)(quizzes_schema_1.Quiz.name)),
    __param(5, (0, mongoose_1.InjectModel)(responses_schema_1.Response.name)),
    __param(6, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __param(7, (0, mongoose_1.InjectModel)(modulerating_schema_1.Rating.name)),
    __param(8, (0, mongoose_1.InjectModel)(instructorrating_schema_1.InstructorRating.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PerformanceTrackingService);
//# sourceMappingURL=performance-tracking.service.js.map