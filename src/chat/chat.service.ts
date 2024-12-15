import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './message.schema'; // Assuming you have this Message schema
import { UserService } from 'src/user-managment/user.service';
import { Course } from 'src/course-management/course.schema';
import { CourseService } from 'src/course-management/course.service';
@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(Course.name) private courseModel: Model<Course>,
  
    private readonly CourseService: CourseService,

  ) {}
  
  

  async saveMessage(
    courseId: string,
    senderId: string,
    content: string, // Use `content` instead of `message`
    role: 'student' | 'instructor',
  ): Promise<any> {
    // Create the message document in the Message collection
    const savedMessage = await this.messageModel.create({
      courseId,
      senderId,
      content, // Align with schema
      role,
    });
  
    // Create a string representation of the message
    const msg = `courseId: ${courseId}, senderId: ${senderId}, content: ${content}, role: ${role}`;
  
    // Update the course's messages array
    await this.CourseService.getCourseById(courseId).then((course) => {
      // Push the new message string to the messages array
      course.messages.push(msg);
  
      // Update the course in the database using updateOne or findOneAndUpdate
      this.courseModel.updateOne({ courseId }, { $set: { messages: course.messages } })
        .then(() => console.log('Course updated successfully'))
        .catch((err) => console.error('Error updating course:', err));
    });
  
    // Return the saved message document (optional)
    return savedMessage;
  }
  
  
  
  async handleNewMessage(
    courseId: string,
    senderId: string,
    content: string, // Consistent naming
    role: 'student' | 'instructor',
  ) {
    const newMessage = new this.messageModel({
      courseId,
      senderId,
      content, // Align with schema
      role,
      timestamp: new Date(),
    });
  
    const savedMessage = await newMessage.save();
    return savedMessage;
  }


  


}
