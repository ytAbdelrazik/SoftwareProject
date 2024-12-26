import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PerformanceTrackingController } from './performance-tracking.controller';
import { PerformanceTrackingService } from './performance-tracking.service';
import { Progress, ProgressSchema } from './progress.schema';
import { UserInteractionSchema, UserInteraction } from 'src/recommedation-engine/user-interaction.schema';
import { CourseModule } from 'src/course-management/course.module';  // Import the CourseModule
import { ModuleSchema } from 'src/course-management/module.schema';
import { ModuleModule } from 'src/course-management/module.module'; 
import { Quiz, QuizSchema } from 'src/interactive-modules/quizzes.schema';
import { Course, CourseSchema } from 'src/course-management/course.schema';

@Module({

  imports: [
    MongooseModule.forFeature([
      { name: Progress.name, schema: ProgressSchema },
      { name: UserInteraction.name, schema: UserInteractionSchema },
      { name: Module.name, schema: ModuleSchema }, 
      { name: Course.name, schema: CourseSchema },
      { name: Quiz.name, schema: QuizSchema}
      // Add this line
    ]),
    CourseModule,
    ModuleModule // Add CourseModule here
  ],
  controllers: [PerformanceTrackingController],
  providers: [PerformanceTrackingService],
})
export class PerformanceTrackingModule {}

