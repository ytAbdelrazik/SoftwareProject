import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  Query,
} from '@nestjs/common';
import { PerformanceTrackingService } from './performance-tracking.service';
import { UpdateProgressDto } from './dtos/update-progress.dto';
import { Response } from 'express';

@Controller('performance-tracking')
export class PerformanceTrackingController {
  constructor(private readonly service: PerformanceTrackingService) {}

  // Create new user progress
  @Post()
  async createProgress(@Body() body: any) {
    return this.service.createProgress(body);
  }
  @Get('/allprog')
  async getAllProgress() {
    console.log('Fetching all progress data...');
    return this.service.getAllProgress();
  }
  
  

  // Get performance data for a specific user
  @Get('/user/:userId')
  async getProgressByUser(@Param('userId') userId: string) {
    return this.service.getProgressByUser(userId);
  }

  // Get progress for a user in a specific course
  @Get('/user/:userId/course/:courseId/progress')
  async calculateProgress(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.service.calculateProgress(userId, courseId);
  }

  // Update user progress
  @Put('/:progressId')
  async updateProgress(
    @Param('progressId') progressId: string,
    @Body() updateProgressDto: UpdateProgressDto,
  ) {
    return this.service.updateProgress(progressId, updateProgressDto);
  }

  // Delete a specific user's progress
  @Delete('/:progressId')
  async deleteProgress(@Param('progressId') progressId: string) {
    return this.service.deleteProgress(progressId);
  }

  // Get analytics for a specific course (average completion, active users)
  @Get('/analytics/course/:courseId')
  async getCourseAnalytics(@Param('courseId') courseId: string) {
    return this.service.getCourseAnalytics(courseId);
  }

  @Get('export/:courseId')
   async exportData(
  @Param('courseId') courseId: string,
  @Query('format') format: string,
  @Res() res: Response
) {
  console.log(`Export request received for courseId: ${courseId} with format: ${format}`);

  try {
    await this.service.exportAnalytics(courseId, format, res);
  } catch (error) {
    console.error('Error exporting analytics:', error.message);
    throw error;
  }

}
}