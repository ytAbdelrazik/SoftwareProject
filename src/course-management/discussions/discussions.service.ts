import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Discussion } from './discussions.schema';// Import the schema
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class DiscussionsService {
  constructor(
    @InjectModel(Discussion.name) private discussionModel: Model<Discussion>,
    private readonly notificationsService: NotificationsService, // Inject NotificationsService
  ) {}

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

    const savedDiscussion = await newDiscussion.save();

    // Send notifications to relevant users
    if (role === 'instructor') {
      // Notify all students in the course
      const students = await this.getStudentsInCourse(courseId); // Replace with actual method to fetch students
      students.forEach(async (student) => {
        await this.notificationsService.createNotification(
          student.id,
          `New announcement from instructor: ${content}`,
          'announcement',
        );
      });
    } else if (role === 'student') {
      // Notify the instructor of the course
      const instructor = await this.getInstructorForCourse(courseId); // Replace with actual method to fetch instructor
      if (instructor) {
        await this.notificationsService.createNotification(
          instructor.id,
          `New message in your course: ${content}`,
          'new_message',
        );
      }
    }

    return savedDiscussion;
  }

  async deleteDiscussion(forumId: string, userId: string, role: string): Promise<void> {
    const discussion = await this.discussionModel.findById(forumId);

    if (!discussion) {
      throw new NotFoundException('Forum not found');
    }

    // Allow deletion if:
    // 1. The user is the creator of the forum
    // 2. The user is an instructor and the forum was created by a student
    if (discussion.userId !== userId && !(role === 'instructor' && discussion.role === 'student')) {
      throw new ForbiddenException('You are not allowed to delete this forum');
    }

    await this.discussionModel.deleteOne({ _id: forumId });
  }

  // Placeholder method: Fetch all students in a course (replace with actual logic)
  private async getStudentsInCourse(courseId: string): Promise<{ id: string }[]> {
    // Example implementation
    return [
      { id: 'student1' },
      { id: 'student2' },
    ];
  }

  // Placeholder method: Fetch the instructor for a course (replace with actual logic)
  private async getInstructorForCourse(courseId: string): Promise<{ id: string } | null> {
    // Example implementation
    return { id: 'instructor1' };
  }
}
