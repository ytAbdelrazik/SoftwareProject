import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Res,
  Query,
} from '@nestjs/common';
import { PerformanceTrackingService } from './performance-tracking.service';
import { UpdateProgressDto } from './dtos/update-progress.dto';
import { Response } from 'express';

@Controller('performance-tracking')
export class PerformanceTrackingController {
  constructor(private readonly service: PerformanceTrackingService) {}

  @Post()
  async createProgress(@Body() body: any) {
    return this.service.createProgress(body);
  }

  @Get()
  async getAllProgress() {
    return this.service.getAllProgress();
  }

  @Get('/user/:userId')
  async getProgressByUser(@Param('userId') userId: string) {
    return this.service.getProgressByUser(userId);
  }

  @Put('/:progressId')
  async updateProgress(
    @Param('progressId') progressId: string,
    @Body() updateProgressDto: UpdateProgressDto,
  ) {
    return this.service.updateProgress(progressId, updateProgressDto);
  }

  @Delete('/:progressId')
  async deleteProgress(@Param('progressId') progressId: string) {
    return this.service.deleteProgress(progressId);
  }

  @Get('/analytics/course/:courseId')
  async getCourseAnalytics(@Param('courseId') courseId: string) {
    return this.service.getCourseAnalytics(courseId);
  }

  @Get('/export/:courseId')
  async exportAnalytics(
    @Param('courseId') courseId: string,
    @Query('format') format: string,
    @Res() res: Response,
  ) {
    return this.service.exportAnalytics(courseId, format, res);
  }
}
