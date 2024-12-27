import { Injectable, NotFoundException, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Progress } from './progress.schema';
import { UserInteraction } from 'src/recommedation-engine/user-interaction.schema';
import * as fs from 'fs';
import * as path from 'path';
import * as csvWriter from 'csv-writer'; // npm install csv-writer pdfkit
import { UpdateProgressDto } from './dtos/update-progress.dto';
import { Response } from 'express';
import { Course } from 'src/course-management/course.schema';
import { Module } from 'src/course-management/module.schema';
import { Quiz } from 'src/interactive-modules/quizzes.schema';

@Injectable()
export class PerformanceTrackingService {
  constructor(
    @InjectModel(Progress.name) private readonly progressModel: Model<Progress>,
    @InjectModel(UserInteraction.name) private readonly userInteractionModel: Model<UserInteraction>,
    @InjectModel(Course.name) private readonly courseModel: Model<Course>,
    @InjectModel(Module.name) private readonly moduleModel: Model<Module>,
    @InjectModel(Quiz.name) private readonly quizModel: Model<Quiz>,
  ) {}

  // Create progress record based on user interactions or defaults if no interaction
  async createProgress(progressDto: UpdateProgressDto): Promise<any> {
    const { userId, courseId } = progressDto;
  
    try {
      // Check for duplicate progress
      const existingProgress = await this.progressModel.findOne({ userId, courseId }).exec();
      if (existingProgress) {
        throw new ConflictException('Progress already exists for this course and user.');
      }
  
      const interaction = await this.userInteractionModel.findOne({ userId, courseId }).exec();
  
      if (!interaction) {
        const course = await this.courseModel.findOne({ courseId }).exec();
        if (!course) {
          throw new NotFoundException('Course not found. Please verify the course ID.');
        }
  
        const progress = new this.progressModel({
          progressId: progressDto.progressId,
          userId,
          courseId,
          completionPercentage: 0,
          lastAccessed: new Date(),
        });
  
        return await progress.save();
      }
  
      throw new HttpException('Unexpected error occurred while creating progress.', HttpStatus.INTERNAL_SERVER_ERROR);
    } catch (error) {
      if (error.code === 11000) {
        // MongoDB duplicate key error
        throw new ConflictException('Duplicate progress ID detected. Please use a unique progress ID.');
      }
      throw error; // Re-throw other unexpected errors
    }
  }
  
  // Calculate completion percentage based on modules, quizzes, and user interactions
   async calculateProgress(userId: string, courseId: string) {
    const course = await this.courseModel.findOne({ courseId }).exec();
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

  // Get all progress records
  async getAllProgress(): Promise<Progress[]> {
    const progress = await this.progressModel.find().exec();
    if (!progress.length) {
      throw new NotFoundException('No progress records found.');
    }
    return progress;
  }

  // Get progress for a specific user
  async getProgressByUser(userId: string): Promise<Progress[]> {
    const progress = await this.progressModel.find({ userId }).exec();
    if (!progress.length) {
      throw new NotFoundException('No progress found for this user.');
    }
    return progress;
  }

  // Update an existing progress record
  async updateProgress(progressId: string, updateProgressDto: UpdateProgressDto): Promise<Progress> {
    const updated = await this.progressModel
      .findOneAndUpdate({ progressId }, updateProgressDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException('Progress record not found. Please verify the progress ID.');
    }
    return updated;
  }

  // Delete a progress record
  async deleteProgress(progressId: string): Promise<void> {
    const result = await this.progressModel.findOneAndDelete({ progressId }).exec();
    if (!result) {
      throw new NotFoundException('Progress record not found. Please verify the progress ID.');
    }
  }

    // Get course analytics: average completion and active students
    async getCourseAnalytics(courseId: string) {
      try {
        console.log(`Getting analytics for courseId: ${courseId}`);
        console.log(this.progressModel)
        const progressData = await this.progressModel.find().lean().exec();
        console.log(progressData)
        // First, check if the courseId is being passed correctly
        console.log(`CourseId passed to aggregation: ${courseId}`);
        
        const analytics = await this.progressModel.aggregate([
          { $match: { courseId } }, // Matching the courseId
        ]);
    
        // Log the result of the $match stage to verify if any data was found
        console.log(`After match stage, analytics data: ${JSON.stringify(analytics)}`);
        
        // If no records found, the aggregation will return an empty array
        if (!analytics.length) {
          console.log(`No records found for courseId: ${courseId}`);
          throw new NotFoundException('No analytics found for this course.');
        }
    
        // Proceed to group stage if records were found
        const groupedAnalytics = await this.progressModel.aggregate([
          { $match: { courseId } }, // Matching the courseId
          {
            $group: {
              _id: '$courseId',
              averageCompletion: { $avg: '$completionPercentage' },
              activeStudents: { $sum: 1 },
            },
          },
        ]);
    
        // Log the grouped analytics to see the result
        console.log(`Grouped analytics result: ${JSON.stringify(groupedAnalytics)}`);
    
        if (!groupedAnalytics.length) {
          console.log(`No grouped data found for courseId: ${courseId}`);
          throw new NotFoundException('No analytics found for this course.');
        }
    
        return groupedAnalytics[0]; // Return the first result
    
      } catch (error) {
        // Log the error to understand what went wrong
        console.error(`Error in getCourseAnalytics: ${error.message}`, error);
        throw error;
      }
    }
    
  // Export course analytics (CSV or PDF)
  async exportAnalytics(courseId: string, format: string, res: Response): Promise<void> {
    console.log(`Exporting analytics for courseId: ${courseId} with format: ${format}`);
    
    const data = await this.getCourseAnalytics(courseId);
    console.log('Analytics data retrieved:', data);
  
    if (format === 'csv') {
      console.log('Processing CSV export...');
      const csvPath = path.join(__dirname, `${courseId}-analytics.csv`);
      const csv = csvWriter.createObjectCsvWriter({
        path: csvPath,
        header: [
          { id: '_id', title: 'Course ID' },
          { id: 'averageCompletion', title: 'Average Completion (%)' },
          { id: 'activeStudents', title: 'Active Students' },
        ],
      });
  
      await csv.writeRecords([data]);
      res.download(csvPath, `${courseId}-analytics.csv`, () => {
        console.log('CSV file downloaded, deleting temporary file.');
        fs.unlinkSync(csvPath);
      });
    } else if (format === 'pdf') {
      console.log('Processing PDF export...');
      const pdfPath = path.join(__dirname, 'src', `${courseId}-analytics.pdf`);

      const PDFDocument = require('pdfkit');
      const doc = new PDFDocument();
      doc.pipe(fs.createWriteStream(pdfPath));
      doc.text(`Course ID: ${data._id}`);
      doc.text(`Average Completion (%): ${data.averageCompletion}`);
      doc.text(`Active Students: ${data.activeStudents}`);
      doc.end();
  
      res.download(pdfPath, `${courseId}-analytics.pdf`, () => {
        console.log('PDF file downloaded, deleting temporary file.');
        fs.unlinkSync(pdfPath);
      });
    } else {
      console.log('Unsupported format received:',format);
      throw new NotFoundException('Unsupported format. Please use CSV or PDF.');
    }
  }
}  