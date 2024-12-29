import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response, ResponseDocument } from './responses.schema';
import { Quiz, QuizDocument } from '../interactive-modules/quizzes.schema';
import { SubmitResponseDto } from './dtos/submit-response.dto';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectModel('Response') private readonly responseModel: Model<ResponseDocument>,
    @InjectModel('Quiz') private readonly quizModel: Model<QuizDocument>,
  ) { }

  /**
   * Submits a response and calculates the score.
   * @param submitResponseDto - The DTO containing quizId, studentId, and answers.
   * @returns The saved response with calculated score.
   */
  async submitResponse(
    studentId: string,
    quizId: string,
    answers: { questionId: string; selectedOption: string }[],
  ): Promise<any> {
    const quiz = await this.quizModel.findOne({ quizId }).exec();
  
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID '${quizId}' not found`);
    }
  
    if (quiz.isAttempted) {
      throw new ConflictException(`You can only take this quiz once.`);
    }
  
    // Calculate the score
    let score = 0;
    const feedback = [];
  
    for (const answer of answers) {
      const question = quiz.questions.find((q) => q.question === answer.questionId);
  
      if (!question) {
        throw new NotFoundException(`Question with ID '${answer.questionId}' not found`);
      }
  
      const isCorrect = question.answer === answer.selectedOption;
      if (isCorrect) {
        score += 1; // Increment score for correct answers
      } else {
        feedback.push({
          questionId: answer.questionId,
          correctAnswer: question.answer,
          yourAnswer: answer.selectedOption,
        });
      }
    }
  
    // Mark quiz as attempted
    quiz.isAttempted = true;
    await quiz.save();
  
    // Return feedback and score
    return {
      studentId,
      quizId,
      score,
      feedback,
      message: score >= quiz.questions.length * 0.6 ? 'You passed!' : 'You need to study again!',
    };
  }
  



  async getFeedback(studentId: string, quizId: string): Promise<any> {
    const response = await this.responseModel.findOne({ studentId, quizId }).exec();

    if (!response) {
      throw new NotFoundException(`No response found for student ID '${studentId}' and quiz ID '${quizId}'`);
    }

    const quiz = await this.quizModel.findOne({ quizId }).exec();
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID '${quizId}' not found`);
    }

    const feedback = response.answers.map((answer) => {
      const question = quiz.questions.find((q) => q.question === answer.questionId);
      if (!question) return { questionId: answer.questionId, feedback: 'Question not found in quiz' };

      return {
        questionId: answer.questionId,
        selectedOption: answer.selectedOption,
        correctOption: question.answer,
        isCorrect: answer.selectedOption === question.answer,
      };
    });

    return {
      score: response.score,
      feedback,
    };
  }


  /**
   * Fetches a student's response for a specific quiz.
   * @param quizId - Quiz ID.
   * @param studentId - Student ID.
   * @returns The response document.
   */
  async getResponse(quizId: string, studentId: string): Promise<Response> {
    const response = await this.responseModel.findOne({ quizId, studentId }).exec();
    if (!response) {
      throw new NotFoundException(`Response not found for quiz ID '${quizId}' and student ID '${studentId}'`);
    }
    return response;
  }



}
