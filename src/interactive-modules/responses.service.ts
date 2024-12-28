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
  async submitResponse(studentId: string, quizId: string, answers: any[]): Promise<any> {
    // Check if the student already submitted the quiz
    const existingResponse = await this.responseModel.findOne({ studentId, quizId }).exec();
    if (existingResponse) {
      throw new ConflictException(`Student with ID '${studentId}' has already attempted the quiz.`);
    }



    // Retrieve the quiz
    const quiz = await this.quizModel.findOne({ quizId }).exec();
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID '${quizId}' not found.`);
    }

    // Randomize the questions for the student
    const randomizedQuestions = quiz.questions.sort(() => Math.random() - 0.5);

    // Calculate score and identify wrong answers
    let score = 0;
    const wrongAnswers = [];

    randomizedQuestions.forEach((question) => {
      const studentAnswer = answers.find((a) => a.questionId === question.question);
      if (studentAnswer && studentAnswer.selectedOption === question.answer) {
        score++;
      } else {
        wrongAnswers.push({
          question: question.question,
          correctAnswer: question.answer,
          studentAnswer: studentAnswer ? studentAnswer.selectedOption : 'No Answer',
        });
      }
    });

    // Calculate pass/fail status
    const passPercentage = 0.7; // 70% to pass
    const isPassed = score >= quiz.questions.length * passPercentage;

    const feedbackMessage = isPassed
      ? 'You are good to go to the next course.'
      : 'You need to study again for the course.';

    // Mark the quiz as attempted
    if (!quiz.isAttempted) {
      quiz.isAttempted = true;
      await quiz.save();
    }

    // Save the response
    const newResponse = new this.responseModel({
      studentId,
      quizId,
      answers,
      score,
      isCompleted: true,
    });
    await newResponse.save();

    return {
      message: feedbackMessage,
      score,
      isPassed,
      wrongAnswers,
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
