import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from './quizzes.schema';
import { Response, ResponseSchema } from './responses.schema';
import { InteractiveModulesService } from './quizzes.service';
import { InteractiveModulesController } from './quizzes.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quiz.name, schema: QuizSchema },
      { name: Response.name, schema: ResponseSchema },
    ]),
  ],
  controllers: [InteractiveModulesController],
  providers: [InteractiveModulesService],
  exports: [MongooseModule], // Export schemas if used in other modules
})
export class InteractiveModulesModule {}
