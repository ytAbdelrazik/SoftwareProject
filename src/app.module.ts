import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user-managment/users.module";
import { ResponseModule } from "./interactive-modules/responses.module";
import{InteractionModule} from "src/recommedation-engine/user-interaction.module"
import{RecommendationModule} from "src/recommedation-engine/recommendation.module"
import{PerformanceTrackingModule} from "src/performance-tracking/performance-tracking.module"
import{InteractiveModulesModule} from "src/interactive-modules/quizzes.module"
import{CourseModule} from"src/course-management/course.module"
import{ModuleModule} from "src/course-management/module.module"
import { StudentSchema } from './course-management/student.schema';
import { InstructorSchema } from './course-management/instructor.schema';
import { AuthModule } from './user-managment/auth.module';
@Module({
  imports: [
  MongooseModule.forRoot('mongodb+srv://ahmed:ahmed2006@cluster0.l8ikh.mongodb.net'), 
  UserModule,ResponseModule,InteractionModule,RecommendationModule,PerformanceTrackingModule,ModuleModule,InteractiveModulesModule,CourseModule,AuthModule,
  MongooseModule.forFeature([
    { name: 'Student', schema: StudentSchema },
    { name: 'Instructor', schema: InstructorSchema },
  ]),],
  controllers: [],
  providers: [],
})
export class AppModule {}
