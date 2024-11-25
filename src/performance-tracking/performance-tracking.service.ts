import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Progress } from './progres.schema';
import { UpdateProgressDto } from './dtos/update-progress.dto';

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
}
