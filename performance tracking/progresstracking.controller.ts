import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PerformanceTrackingService } from './progresstracking.service';
import { UpdateProgressDto } from './dtos/updateprog';

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
}
