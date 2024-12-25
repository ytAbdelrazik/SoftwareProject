import { Controller, Get, Post, Put, Delete, Param, Body, Request } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { CreateDiscussionDto } from '../dtos/create-discussion.dto';
import { UpdateDiscussionDto } from '../dtos/update-discussion.dto';

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
    @Body() createDiscussionDto: CreateDiscussionDto,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
    const role = req.user.role;
    return this.discussionsService.createDiscussion(courseId, userId, role, createDiscussionDto);
  }

  @Put(':forumId')
  async updateDiscussion(
    @Param('forumId') forumId: string,
    @Body() updateDiscussionDto: UpdateDiscussionDto,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
    const role = req.user.role;
    return this.discussionsService.updateDiscussion(forumId, userId, role, updateDiscussionDto);
  }

  @Delete(':forumId')
  async deleteDiscussion(@Param('forumId') forumId: string, @Request() req: any) {
    const userId = req.user.userId;
    const role = req.user.role;
    return this.discussionsService.deleteDiscussion(forumId, userId, role);
  }
}