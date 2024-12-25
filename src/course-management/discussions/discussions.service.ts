import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Discussion } from './discussions.schema';
import { CreateDiscussionDto } from '../dtos/create-discussion.dto';
import { UpdateDiscussionDto } from '../dtos/update-discussion.dto';

@Injectable()
export class DiscussionsService {
  constructor(@InjectModel(Discussion.name) private discussionModel: Model<Discussion>) {}

  async getDiscussionsByCourse(courseId: string): Promise<Discussion[]> {
    return this.discussionModel.find({ courseId }).exec();
  }

  async createDiscussion(
    courseId: string,
    userId: string,
    role: string,
    createDiscussionDto: CreateDiscussionDto,
  ): Promise<Discussion> {
    const newDiscussion = new this.discussionModel({
      courseId,
      userId,
      role,
      content: createDiscussionDto.content,
    });
    return newDiscussion.save();
  }

  async updateDiscussion(
    forumId: string,
    userId: string,
    role: string,
    updateDiscussionDto: UpdateDiscussionDto,
  ): Promise<Discussion> {
    const discussion = await this.discussionModel.findById(forumId);

    if (!discussion) throw new NotFoundException('Forum not found');

    if (discussion.userId !== userId) {
      throw new ForbiddenException('You are not allowed to edit this forum');
    }

    discussion.content = updateDiscussionDto.content;
    return discussion.save();
  }

  async deleteDiscussion(forumId: string, userId: string, role: string): Promise<void> {
    const discussion = await this.discussionModel.findById(forumId);

    if (!discussion) throw new NotFoundException('Forum not found');

    if (discussion.userId !== userId && role !== 'instructor') {
      throw new ForbiddenException('You are not allowed to delete this forum');
    }

    await this.discussionModel.deleteOne({ _id: forumId });
  }
}