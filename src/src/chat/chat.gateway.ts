import { WebSocketGateway, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { MessageBody } from '@nestjs/websockets';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { UserService } from 'src/user-managment/user.service';
import { CourseService } from 'src/course-management/course.service';

@WebSocketGateway(3002, {
  cors: {
    origin: ['http://localhost:3000'], // Update with your client-side origin
  },
})
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService, // Inject the UserService to check enrollment
    private readonly courseService: CourseService // Inject the CourseService to get course details
  ) {}

  @SubscribeMessage('New Message')
  async handleNewMessage(
    client: Socket,
    @MessageBody() { courseId, message, senderId, role }: { courseId: string; message: string; senderId: string; role: 'student' | 'instructor' }
  ) {
    console.log('Received Message:', { courseId, message, senderId, role });

    try {
      const user = await this.userService.getUserById(senderId);

      if (user.role === 'student') {
        const isEnrolled = await this.userService.isStudentEnrolledInCourse(courseId, senderId);

        if (!isEnrolled) {
          this.server.emit('error', 'You are not enrolled in this course');
          return; // Exit if the student is not enrolled
        }
      } else if (user.role === 'instructor') {
        const isEnrolled = await this.userService.istheinstructorInCourse(courseId, senderId);

        if (!isEnrolled) {
          this.server.emit('error', 'You are not enrolled in this course');
          return; 
        }
      } else {
        this.server.emit('error', 'You are not enrolled in this course');
        return;
      }

      const savedMessage = await this.chatService.saveMessage(courseId, message, senderId, role);

      // Emit the message to all clients in the course room
      this.server.emit('broadcast', {
        timestamp: savedMessage.timestamp,
        message: `Message broadcasted in course ${courseId} by ${role} ${senderId} ${message} at ${savedMessage.timestamp}`,
        senderId: senderId,
        courseId: courseId, // Include courseId in the emitted data
        content: message, // Only content
      });

      console.log(`Message broadcasted in course ${courseId} by ${role} (ID: ${senderId}): ${message}`);
    } catch (error) {
      console.error(`Error handling new message: ${error.message}`); // When user is not found
      client.emit('error', `Error: ${error.message}`);
    }
  }
}
