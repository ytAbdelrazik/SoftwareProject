import { Controller, Post, Body, Param, UseGuards, Get, Patch, BadRequestException, Delete, Req } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dtos/create-quiz.dto';
import { RolesGuard } from '../user-managment/roles.guard';
import { Roles } from '../user-managment/roles.decorator';

@Controller('quizzes')
@UseGuards(RolesGuard)
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  /**
   * Generate a randomized quiz.
   */
  @Post(':moduleId/generate')
  @UseGuards(RolesGuard)
  @Roles('instructor') // Only instructors can generate quizzes
  async generateQuiz(
    @Param('moduleId') moduleId: string,
    @Body('numberOfQuestions') numberOfQuestions: number,
    @Body('questionTypes') questionTypes: string[],
  ) {
    if (!numberOfQuestions || !questionTypes) {
      throw new BadRequestException('Number of questions and question types are required');
    }

    return this.quizzesService.generateRandomizedQuiz(moduleId, numberOfQuestions, questionTypes);
  }

  /**
   * Get a quiz by module ID.
   */
  @Get(':moduleId')
  @Roles('student')
  async getQuizByModule(@Param('moduleId') moduleId: string) {
    return this.quizzesService.getQuizByModule(moduleId);
  }

  /**
   * Update a quiz.
   */
  @Patch(':quizId')
  @UseGuards(RolesGuard)
  @Roles('instructor') // Only instructors can update quizzes
  async updateQuiz(@Param('quizId') quizId: string, @Body() updatedData: Partial<CreateQuizDto>) {
    return this.quizzesService.updateQuiz(quizId, updatedData);
  }

  @Delete(':quizId')
  @Roles('instructor') // Only instructors can delete quizzes
  async deleteQuiz(@Param('quizId') quizId: string) {
    return this.quizzesService.deleteQuiz(quizId);
  }


}



