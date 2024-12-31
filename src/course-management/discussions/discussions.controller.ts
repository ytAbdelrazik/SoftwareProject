import { Controller, Get, Post, Patch, Delete, Param, Body, Request } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';

@Controller('courses/:courseId/forums')
export class DiscussionsController {
  constructor(private readonly discussionsService: DiscussionsService) {}

  @Get()
  async getDiscussions(@Param('courseId') courseId: string) {
    return this.discussionsService.getDiscussionsByCourse(courseId);
  }

  @Post()
  async createDiscussion(
    @Param('courseId') courseId: string,
    @Body('content') content: string,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
    const role = req.user.role;
    return this.discussionsService.createDiscussion(courseId, userId, role, content);
  }
}
