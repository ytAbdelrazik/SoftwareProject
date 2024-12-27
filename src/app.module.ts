<<<<<<< HEAD
import { Module, MiddlewareConsumer, NestModule} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserModule } from './user-managment/users.module';
import { ResponseModule } from './interactive-modules/responses.module';
import { InteractionModule } from './recommendation-engine/user-interaction.module';
import { RecommendationModule } from './recommendation-engine/recommendation.module';
=======
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './user-managment/users.module';
import { ResponseModule } from './interactive-modules/responses.module';
import { InteractionModule } from './recommedation-engine/user-interaction.module';
import { RecommendationModule } from './recommedation-engine/recommendation.module';
>>>>>>> dev
import { PerformanceTrackingModule } from './performance-tracking/performance-tracking.module';
import { InteractiveModulesModule } from './interactive-modules/quizzes.module';
import { CourseModule } from './course-management/course.module';
import { ModuleModule } from './course-management/module.module';
<<<<<<< HEAD
import { AuthModule } from './auth/auth.module';
import { RoleMiddleware } from './auth/auth.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_jwt_secret',
    }),
    MongooseModule.forRoot('mongodb+srv://mm:mm123@cluster0.l8ikh.mongodb.net'), // Ensure this is your actual DB connection string
    UserModule,
=======
import { AuthModule } from './user-managment/auth.module';
import { FailedLoginSchema } from './user-managment/failed-login.schema';
import { User, UserSchema } from './user-managment/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './user-managment/roles.guard';
import { Reflector } from '@nestjs/core';
import { ChatModule } from './chat/chat.module';
import { CourseSchema } from './course-management/course.schema'
import { QuickNotesModule } from './quick-notes/notes.module';
import { ChatService } from './chat/chat.service';


@Module({
  imports: [
    // Database connection
    MongooseModule.forRoot('mongodb+srv://ahmed:ahmed2006@cluster0.l8ikh.mongodb.net'),

    // Feature modules
    UsersModule,
>>>>>>> dev
    ResponseModule,
    InteractionModule,
    RecommendationModule,
    PerformanceTrackingModule,
<<<<<<< HEAD
    InteractiveModulesModule,
    CourseModule,
    ModuleModule,
    AuthModule,
    RoleMiddleware,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RoleMiddleware).forRoutes('*'); // Apply middleware globally
  }
}
=======
    ModuleModule,
    InteractiveModulesModule,
    CourseModule,
    AuthModule,
    ChatModule,
    QuickNotesModule, // Ensure this is correctly imported

    // Schemas
    MongooseModule.forFeature([
      { name: 'FailedLogin', schema: FailedLoginSchema },
      { name: User.name, schema: UserSchema },
     
    ]),

    // JWT Module
    JwtModule.register({
      secret: 'ahmed', // Replace with a secure secret key
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [],
  providers: [
    RolesGuard,
    Reflector,
    

   
    

  ],
})
export class AppModule {}
>>>>>>> dev
