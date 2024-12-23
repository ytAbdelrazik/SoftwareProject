import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/user-managment/user-service';
import { User, UserSchema } from 'src/user-managment/users.schema';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema 

      },
    ]), // Ensure this is correct
  ],
  providers: [UserService],
  controllers: [UserController], 
})

export class UserModule {}

  
