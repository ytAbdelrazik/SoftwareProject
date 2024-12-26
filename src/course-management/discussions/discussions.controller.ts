import { Controller, Get, Post, Delete, Param, Body, Request } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';

@Controller('courses/:id/forums')
export class DiscussionsController {
  constructor(private readonly discussionsService: DiscussionsService) {}

  @Get()
  async getDiscussions(@Param('id') courseId: string) {
    return this.discussionsService.getDiscussionsByCourse(courseId);
  }

  @Post()
  async createDiscussion(
    @Param('id') courseId: string,
    @Body('content') content: string,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
    const role = req.user.role;
    return this.discussionsService.createDiscussion(courseId, userId, role, content);
  }

  @Delete(':forumId')
  async deleteDiscussion(@Param('forumId') forumId: string, @Request() req: any) {
    const userId = req.user.userId;
    const role = req.user.role;
    return this.discussionsService.deleteDiscussion(forumId, userId, role);
  }
}
