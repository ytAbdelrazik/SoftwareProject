import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InteractiveModulesService } from './quizzes.service';
import { Quiz } from './quizzes.schema';
import { Response } from './responses.schema';

@Controller('interactive-modules')
export class InteractiveModulesController {
  constructor(
    private readonly interactiveModulesService: InteractiveModulesService,
  ) {}

  // Endpoint to create a new quiz
  @Post('quizzes')
  async createQuiz(@Body() quiz: Quiz): Promise<Quiz> {
    return this.interactiveModulesService.createQuiz(quiz);
  }

  // Endpoint to get all quizzes
  @Get('quizzes')
  async getQuizzes(): Promise<Quiz[]> {
    return this.interactiveModulesService.getQuizzes();
  }

  // Endpoint to submit a response
  @Post('responses')
  async submitResponse(@Body() response: Response): Promise<Response> {
    return this.interactiveModulesService.submitResponse(response);
  }

  // Endpoint to get responses by quiz ID
  @Get('responses/:quizId')
  async getResponses(@Param('quizId') quizId: string): Promise<Response[]> {
    return this.interactiveModulesService.getResponses(quizId);
  }
}
