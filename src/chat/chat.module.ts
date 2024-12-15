import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { Message, MessageSchema } from './message.schema';
import { UsersModule } from 'src/user-managment/users.module'; // Import UserModule
import { CourseModule } from 'src/course-management/course.module';
import { UserService } from 'src/user-managment/user.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    UsersModule,
    CourseModule // Add UserModule here
  ],
  providers: [ChatService, ChatGateway,CourseModule,UsersModule],
 


 
  controllers: [ChatController],
})
export class ChatModule {}