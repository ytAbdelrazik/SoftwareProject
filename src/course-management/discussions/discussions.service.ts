import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Discussion } from './discussions.schema';

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
    content: string,
  ): Promise<Discussion> {
    const newDiscussion = new this.discussionModel({
      courseId,
      userId,
      role,
      content,
    });
    return newDiscussion.save();
  }

  async deleteDiscussion(forumId: string, userId: string, role: string): Promise<void> {
    const discussion = await this.discussionModel.findById(forumId);

    if (!discussion) {
      throw new NotFoundException('Forum not found');
    }

    // Allow deletion if:
    // 1. The user is the creator of the forum
    // 2. The user is an instructor, and the forum was created by a student
    if (discussion.userId !== userId && !(role === 'instructor' && discussion.role === 'student')) {
      throw new ForbiddenException('You are not allowed to delete this forum');
    }

    await this.discussionModel.deleteOne({ _id: forumId });
  }
}
