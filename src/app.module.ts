import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserManagementModule } from './user-management/user-management.module';
import { CourseManagementModule } from './course-management/course-management.module';
import { InteractiveModulesModule } from './interactive-modules/interactive-modules.module';
import { PerformanceTrackingModule } from './performance-tracking/performance-tracking.module';
import { RecommendationEngineModule } from './recommendation-engine/recommendation-engine.module';

@Module({
  imports: [UserManagementModule, CourseManagementModule, InteractiveModulesModule, PerformanceTrackingModule, RecommendationEngineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
