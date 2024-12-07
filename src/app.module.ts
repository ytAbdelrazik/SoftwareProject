import { Module, MiddlewareConsumer, NestModule} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserModule } from './user-managment/users.module';
import { ResponseModule } from './interactive-modules/responses.module';
import { InteractionModule } from './recommendation-engine/user-interaction.module';
import { RecommendationModule } from './recommendation-engine/recommendation.module';
import { PerformanceTrackingModule } from './performance-tracking/performance-tracking.module';
import { InteractiveModulesModule } from './interactive-modules/quizzes.module';
import { CourseModule } from './course-management/course.module';
import { ModuleModule } from './course-management/module.module';
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
    ResponseModule,
    InteractionModule,
    RecommendationModule,
    PerformanceTrackingModule,
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
