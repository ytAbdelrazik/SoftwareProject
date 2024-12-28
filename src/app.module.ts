import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { UserModule } from './user-managment/users.module';
import { ResponseModule } from './interactive-modules/responses.module';
import { InteractionModule } from './recommendation-engine/user-interaction.module';
import { RecommendationModule } from './recommendation-engine/recommendation.module';
import { PerformanceTrackingModule } from './performance-tracking/performance-tracking.module';
import { InteractiveModulesModule } from './interactive-modules/quizzes.module';
import { CourseModule } from './course-management/course.module';
import { AuthModule } from './auth/auth.module';
import { RoleMiddleware } from './auth/auth.middleware';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_jwt_secret',
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forRoot('mongodb+srv://mm:mm123@cluster0.l8ikh.mongodb.net'), // MongoDB connection
    UserModule,
    ResponseModule,
    InteractionModule,
    RecommendationModule,
    PerformanceTrackingModule,
    InteractiveModulesModule,
    CourseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RoleMiddleware)
      .exclude(
        { path: 'auth/register', method: RequestMethod.POST }, // Use RequestMethod.POST
        { path: 'auth/login', method: RequestMethod.POST }     // Use RequestMethod.POST
      )
      .forRoutes('*'); // Apply middleware to all other routes
  }
}
