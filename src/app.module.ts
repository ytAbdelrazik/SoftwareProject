import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './user-managment/users.module';
import { ResponseModule } from './interactive-modules/responses.module';
import { InteractionModule } from './recommedation-engine/user-interaction.module';
import { RecommendationModule } from './recommedation-engine/recommendation.module';
import { PerformanceTrackingModule } from './performance-tracking/performance-tracking.module';
import { InteractiveModulesModule } from './interactive-modules/quizzes.module';
import { CourseModule } from './course-management/course.module';
import { ModuleModule } from './course-management/module.module';
import { AuthModule } from './user-managment/auth.module';
import { FailedLoginSchema } from './user-managment/failed-login.schema';
import { User, UserSchema } from './user-managment/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './user-managment/roles.guard';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [
    // Database connection
    MongooseModule.forRoot('mongodb+srv://ahmed:ahmed2006@cluster0.l8ikh.mongodb.net'), 

    // Feature modules
    UsersModule,
    ResponseModule,
    InteractionModule,
    RecommendationModule,
    PerformanceTrackingModule,
    ModuleModule,
    InteractiveModulesModule,
    CourseModule,
    AuthModule,

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
  controllers: [], // Controllers in the App Module
  providers: [
    RolesGuard, // Role-based access control guard
    Reflector,  // Used for metadata reflection
  ],
})
export class AppModule {}
