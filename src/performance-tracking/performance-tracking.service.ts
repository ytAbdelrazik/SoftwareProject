import {
  Injectable,
  NotFoundException,
  ConflictException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import * as csvWriter from 'csv-writer';
import { UpdateProgressDto } from './dtos/update-progress.dto';
import { Progress } from './progress.schema';
import { UserInteraction } from 'src/recommedation-engine/user-interaction.schema';
import { Response } from 'src/interactive-modules/responses.schema';
import { Course } from 'src/course-management/course.schema';
import { Module } from 'src/course-management/module.schema';
import { Quiz } from 'src/interactive-modules/quizzes.schema';
import { User } from 'src/user-managment/users.schema';
import { Response as ExpressResponse } from 'express';
import { Rating } from './modulerating.schema';

import * as os from 'os';
import { InstructorRating } from './instructorrating.schema';

@Injectable()
export class PerformanceTrackingService {
  constructor(
    @InjectModel(Progress.name) private readonly progressModel: Model<Progress>,
    @InjectModel(UserInteraction.name) private readonly userInteractionModel: Model<UserInteraction>,
    @InjectModel(Course.name) private readonly courseModel: Model<Course>,
    @InjectModel(Module.name) private readonly moduleModel: Model<Module>,
    @InjectModel(Quiz.name) private readonly quizModel: Model<Quiz>,
    @InjectModel(Response.name) private readonly responseModel: Model<Response>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Rating.name) private readonly ratingModel: Model<Rating>,
    @InjectModel(InstructorRating.name) private readonly instructorRatingModel: Model<InstructorRating>
  ) {}

  async getProgressByUser(userId: string): Promise<Progress[]> {
    const progress = await this.progressModel.find({ userId }).exec();
    if (progress.length === 0) {
      throw new NotFoundException('No progress found for this user.');
    }
    return progress;
  }

  async updateProgress(progressId: string, updateProgressDto: UpdateProgressDto): Promise<Progress> {
    const progress = await this.progressModel.findByIdAndUpdate(
      progressId, // Find by progressId
      { $set: updateProgressDto }, // Apply the updates from DTO
      { new: true } // Return the updated document
    ).exec();

    if (!progress) {
      throw new NotFoundException('Progress not found to update.');
    }

    return progress;
  }

  async deleteProgress(progressId: string): Promise<void> {
    const result = await this.progressModel.findByIdAndDelete(progressId).exec();

    if (!result) {
      throw new NotFoundException('Progress not found to delete.');
    }
  }

  // Add Rating
  async addRating(userId: string, courseId: string, moduleId: string , rating: number): Promise<Rating> {
    const newRating = new this.ratingModel({ userId, courseId, moduleId, rating });
    return newRating.save();
  }

  // Get Average Rating for a Course Based on Module Ratings
  async getAverageRatingForCourse(courseId: string): Promise<number> {
    const result = await this.ratingModel.aggregate([
      {
        $lookup: {
          from: 'modules',
          localField: 'moduleId',
          foreignField: '_id',
          as: 'module',
        },
      },
      { $unwind: '$module' },
      { $match: { 'module.courseId': courseId } }, // Use String for courseId
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
        },
      },
    ]);

    if (!result.length) {
      throw new NotFoundException('No ratings found for this course.');
    }

    return result[0].averageRating;
  }

  // Get Module Ratings for a Course
  async getModuleRatings(courseId: string): Promise<any[]> {
    const result = await this.ratingModel.aggregate([
      {
        $lookup: {
          from: 'modules',
          localField: 'moduleId',
          foreignField: '_id',
          as: 'module',
        },
      },
      { $unwind: '$module' },
      { $match: { 'module.courseId': courseId } }, // Use String for courseId
      {
        $group: {
          _id: '$moduleId',
          averageRating: { $avg: '$rating' },
        },
      },
    ]);

    return result;
  }

  // Get Average Rating for an Instructor
  async getAverageRatingForInstructor(instructorId: string): Promise<number> {
    const result = await this.instructorRatingModel.aggregate([
      {
        $match: { instructorId: instructorId }, // Use String for instructorId
      },
      {
        $group: {
          _id: '$instructorId', // Group by instructorId (String)
          averageRating: { $avg: '$rating' }, // Calculate average rating
        },
      },
    ]);

    if (!result.length) {
      throw new NotFoundException('No ratings found for this instructor.');
    }

    return result[0].averageRating;
  }

  //* Create Progress Record
  async createProgress(progressDto: UpdateProgressDto): Promise<Progress> {
    const { userId, courseId } = progressDto;

    const existingProgress = await this.progressModel.findOne({ userId, courseId }).exec();
    if (existingProgress) {
      throw new ConflictException('Progress already exists for this course and user.');
    }

    const interaction = await this.userInteractionModel.findOne({ userId, courseId }).exec();

    if (!interaction) {
      const course = await this.courseModel.findOne({ _id: courseId }).exec();
      if (!course) {
        throw new NotFoundException('Course not found. Please verify the course ID.');
      }

      const progress = new this.progressModel({
        ...progressDto,
        completionPercentage: 0,
        lastAccessed: new Date(),
      });

      return progress.save();
    }

    throw new HttpException('Unexpected error occurred while creating progress.', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  /* Calculate Progress for a Course
  async calculateProgress(userId: string, courseId: string): Promise<{ completionPercentage: number; lastAccessed: Date }> {
    const course = await this.courseModel.findOne({ _id: courseId }).exec();
    if (!course) {
      throw new NotFoundException('Course not found. Please verify the course ID.');
    }

    const modules = await this.moduleModel.find({ courseId }).exec();
    const quizzes = await this.quizModel.find({ courseId }).exec();

    if (!modules.length && !quizzes.length) {
      throw new NotFoundException('No modules or quizzes found for this course.');
    }

    const interactions = await this.userInteractionModel.find({ userId, courseId }).exec();

    if (!interactions.length) {
      return { completionPercentage: 0, lastAccessed: new Date() };
    }

    const completedModules = interactions.filter((interaction) => interaction.timeSpentMinutes > 0).length;
    const completedQuizzes = interactions.filter((interaction) => interaction.score > 0).length;

    const totalModules = modules.length;
    const totalQuizzes = quizzes.length;

    const completionPercentage = Math.floor(
      ((completedModules + completedQuizzes) / (totalModules + totalQuizzes)) * 100
    );

    return {
      completionPercentage,
      lastAccessed: interactions[interactions.length - 1].lastAccessed || new Date(),
    };
  }
*/
  // Get All Progress Records
  async getAllProgress(): Promise<Progress[]> {
    const progress = await this.progressModel.find().exec();
    if (!progress.length) {
      throw new NotFoundException('No progress records found.');
    }
    return progress;
  }
  async getQuizPerformanceByQuizId(quizId: string): Promise<any> {
    const quizScores = await this.responseModel.aggregate([
      { $match: { quizId: quizId } }, // Filter by quizId
      {
        $group: {
          _id: '$quizId',
          totalResponses: { $count: {} }, // Total responses for the quiz
          averageScore: { $avg: '$score' }, // Average score for the quiz
          highestScore: { $max: '$score' }, // Highest score for the quiz
          lowestScore: { $min: '$score' }, // Lowest score for the quiz
        },
      },
    ]);

    if (!quizScores.length) {
      throw new NotFoundException('No responses found for this quiz.');
    }

    return quizScores[0]; // Return the performance data for the quiz
  }
  async getStudentQuizPerformance(quizId: string, userId: string): Promise<any> {
    const studentScore = await this.responseModel.findOne({ quizId, userId }).exec();

    if (!studentScore) {
      throw new NotFoundException('No response found for this quiz and student.');
    }

    return {
      quizId,
      userId,
      score: studentScore.score,
      submittedAt: studentScore.submittedAt,
    };
  }

  async getStudentDashboard(studentId: string): Promise<any> {
    // Step 1: Fetch all progress data for the student
    const progressData = await this.progressModel.find({ userId: studentId }).exec();

    if (!progressData.length) {
      throw new NotFoundException('No progress data found for this student.');
    }

    // Step 2: Aggregate course completion data directly from the progress schema
    const courseCompletions = progressData.map((progress) => ({
      courseId: progress.courseId,
      completionPercentage: progress.completionPercentage,
      lastAccessed: progress.lastAccessed,
    }));

    // Step 3: Calculate average performance score
    const allScores = await this.userInteractionModel.find({ userId: studentId }).exec();
    const averageScore =
      allScores.reduce((sum, interaction) => sum + (interaction.score || 0), 0) / allScores.length;

    // Step 4: Gather quiz performance metrics
    const quizzes = await this.responseModel.find({ userId: studentId }).exec();
    const quizPerformances = quizzes.map((quiz) => ({
      quizId: quiz.quizId,
      score: quiz.score,
      submittedAt: quiz.submittedAt,
    }));

    // Step 5: Prepare the final dashboard data
    return {
      studentId,
      courseCompletions, // List of course completion percentages and last accessed dates
      averageScore: Number(averageScore.toFixed(2)), // Keep 2 decimal places
      quizPerformances,
    };
  }

  async exportAnalytics(courseId: string, format: string, res: ExpressResponse): Promise<void> {
    // Get course analytics, including performance categories
    const data = await this.getCourseAnalytics(courseId);
  
    // Get additional data: course ratings, module ratings, and instructor rating
    const averageCourseRating = await this.getAverageRatingForCourse(courseId);
    const moduleRatings = await this.getModuleRatings(courseId);
    const averageInstructorRating = await this.getAverageRatingForInstructor(courseId); // Assuming instructorId is linked to the course
  
    // Add these ratings data to the data object
    data.averageCourseRating = averageCourseRating;
    data.moduleRatings = moduleRatings;
    data.averageInstructorRating = averageInstructorRating;
  
    // Use system's temporary directory
    const tmpDir = os.tmpdir();
    
    // Generate a safe and unique filename
    const fileName = `${courseId}-analytics-${Date.now()}.csv`;
  
    if (format === 'csv') {
      const csvPath = path.join(tmpDir, fileName); // Using the temp directory for CSV file
      
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
    
      await csv.writeRecords([data]);
    
      // Respond with the CSV file
      res.download(csvPath, fileName, () => fs.unlinkSync(csvPath));  // Automatically delete after download
    } else if (format === 'pdf') {
      const pdfPath = path.join(tmpDir, `${courseId}-analytics-${Date.now()}.pdf`);
      const PDFDocument = require('pdfkit');
      const doc = new PDFDocument();
      doc.pipe(fs.createWriteStream(pdfPath));
      
      doc.text(`Course ID: ${data._id}`);
      doc.text(`Average Completion (%): ${data.averageCompletion}`);
      doc.text(`Active Students: ${data.activeStudents}`);
      doc.text(`Average Course Rating: ${data.averageCourseRating.toFixed(2)}`);
      doc.text(`Average Instructor Rating: ${data.averageInstructorRating.toFixed(2)}`);
      doc.text(`Performance Categories:`);
      doc.text(`  - Below Average: ${data.performanceCategories.belowAverage}`);
      doc.text(`  - Average: ${data.performanceCategories.average}`);
      doc.text(`  - Above Average: ${data.performanceCategories.aboveAverage}`);
      doc.text(`  - Excellent: ${data.performanceCategories.excellent}`);
      doc.text(`Module Ratings:`);
      data.moduleRatings.forEach((module: any) => {
        doc.text(`Module ID: ${module._id} - Average Rating: ${module.averageRating.toFixed(2)}`);
      });
  
      doc.end();
    
      doc.on('finish', () => {
        res.download(pdfPath, `${courseId}-analytics-${Date.now()}.pdf`, () => fs.unlinkSync(pdfPath));
      });
    } else {
      throw new HttpException('Invalid export format requested.', HttpStatus.BAD_REQUEST);
    }
  }
  
  
  // Helper function to gather course analytics data
  async getCourseAnalytics(courseId: string): Promise<any> {
    const interactions = await this.userInteractionModel.find({ courseId }).exec();
  
    // Step 1: Group interactions by userId
    const studentScores = interactions.reduce((acc, interaction) => {
      if (!acc[interaction.userId]) {
        acc[interaction.userId] = [];
      }
      acc[interaction.userId].push(interaction.score); // Collect scores for each module per student
      return acc;
    }, {});
  
    // Step 2: Calculate average score for each student in the course
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
  
    // Step 3: Categorize students based on their average score in the course
    for (const userId in studentScores) {
      const scores = studentScores[userId];
      const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  
      if (averageScore < 60) {
        performanceCategories.belowAverage++;
      } else if (averageScore >= 60 && averageScore < 80) {
        performanceCategories.average++;
      } else if (averageScore >= 80 && averageScore < 90) {
        performanceCategories.aboveAverage++;
      } else {
        performanceCategories.excellent++;
      }
    }
  
    // Step 4: Get the total number of students who completed the course (based on interactions)
    const studentsCompletedCourse = interactions.filter(
      (interaction) => interaction.score > 0
    ).length;
  
    // Return the analytics data
    return {
      courseId,
      totalStudents,
      studentsCompletedCourse,
      performanceCategories,
    };
  }
  
}
