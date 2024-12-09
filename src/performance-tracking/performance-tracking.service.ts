import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Progress } from './progress.schema';
import { UpdateProgressDto } from './dtos/update-progress.dto';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as csvWriter from 'csv-writer'; //  npm install csv-writer pdfkit

@Injectable()
export class PerformanceTrackingService {
  constructor(
    @InjectModel(Progress.name) private readonly progressModel: Model<Progress>,
  ) {}

  async createProgress(data: any): Promise<Progress> {
    const progress = new this.progressModel(data);
    return progress.save();
  }

  async getAllProgress(): Promise<Progress[]> {
    return this.progressModel.find().exec();
  }

  async getProgressByUser(userId: string): Promise<Progress[]> {
    const progress = await this.progressModel.find({ userId }).exec();
    if (!progress.length) {
      throw new NotFoundException('No progress found for this user.');
    }
    return progress;
  }

  async updateProgress(
    progressId: string,
    updateProgressDto: UpdateProgressDto,
  ): Promise<Progress> {
    const updated = await this.progressModel
      .findOneAndUpdate({ progressId }, updateProgressDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException('Progress not found.');
    }
    return updated;
  }

  async deleteProgress(progressId: string): Promise<void> {
    const result = await this.progressModel
      .findOneAndDelete({ progressId })
      .exec();
    if (!result) {
      throw new NotFoundException('Progress not found.');
    }
  }

  async getCourseAnalytics(courseId: string) {
    const analytics = await this.progressModel.aggregate([
      { $match: { courseId } },
      {
        $group: {
          _id: '$courseId',
          averageCompletion: { $avg: '$completionPercentage' },
          activeStudents: { $sum: 1 },
        },
      },
    ]);
    if (!analytics.length) {
      throw new NotFoundException('No analytics found for this course.');
    }
    return analytics[0];
  }

  async exportAnalytics(
    courseId: string,
    format: string,
    res: Response,
  ): Promise<void> {
    const data = await this.getCourseAnalytics(courseId);

    if (format === 'csv') {
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
        fs.unlinkSync(csvPath);
      });
    } else if (format === 'pdf') {
      const pdfPath = path.join(__dirname, `${courseId}-analytics.pdf`);
      // For PDF generation, use a library like pdf-lib or pdfkit
      const PDFDocument = require('pdfkit');
      const doc = new PDFDocument();
      doc.pipe(fs.createWriteStream(pdfPath));
      doc.text(`Course ID: ${data._id}`);
      doc.text(`Average Completion (%): ${data.averageCompletion}`);
      doc.text(`Active Students: ${data.activeStudents}`);
      doc.end();

      res.download(pdfPath, `${courseId}-analytics.pdf`, () => {
        fs.unlinkSync(pdfPath);
      });
    } else {
      throw new NotFoundException('Unsupported format.');
    }
  }
}
