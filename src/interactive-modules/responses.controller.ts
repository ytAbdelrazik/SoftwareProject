import { Controller, Post, Body, Get, Param, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { SubmitResponseDto } from './dtos/submit-response.dto';
import { RolesGuard } from '../user-managment/roles.guard';
import { Roles } from '../user-managment/roles.decorator';

@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @Post('submit')
  @UseGuards(RolesGuard)
  @Roles('student') // Only students can submit responses
  async submitResponse(
    @Req() req,
    @Body('quizId') quizId: string, // Extract from Body
    @Body('answers') answers: any[],
  ) {
    const studentId = req.user.userId; // Fetch student ID from the logged-in user
    if (!quizId) {
      throw new NotFoundException(`Quiz ID is required.`);
    }
    return this.responsesService.submitResponse(studentId, quizId, answers);
  }
  
  

  @Get('feedback/:quizId')
  @UseGuards(RolesGuard)
  @Roles('student') // Only students can view feedback
  async getFeedback(@Req() req: any, @Param('quizId') quizId: string) {
    const studentId = req.user.userId; // Fetch the student ID from the JWT token
    return this.responsesService.getFeedback(studentId, quizId);
  }
}
