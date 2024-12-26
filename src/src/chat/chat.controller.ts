import { Controller, Patch, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ChatService } from './chat.service';
import { UserService } from 'src/user-managment/user.service';
import { ChatGateway } from './chat.gateway';
import { Student } from 'src/course-management/student.schema';
import { Instructor } from 'src/course-management/instructor.schema';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService,
    private readonly chatGateway: ChatGateway,  // Inject the ChatGateway to emit events
  ) {}

  @Patch('join/:courseId')
  async joinCourse(@Param('courseId') courseId: string, @Body('userId') userId: string) {
    try {
      // Fetch the user by userId (this part is to verify if the user exists)
      const user = await this.userService.getUserById(userId);

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      // Emit the event to the WebSocket server to join the course chat room
      this.chatGateway.server.emit('broadcast',`User ${userId} joined the chat room for course ${courseId}`);

      // Optionally return a success response
      return { message: `User ${userId} joined the chat room for course ${courseId}` };
    } catch (error) {
      throw new HttpException(error.response || 'An error occurred while joining the course', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
