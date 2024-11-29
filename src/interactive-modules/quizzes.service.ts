import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz, QuizDocument } from './quizzes.schema';
import { Response, ResponseDocument } from './responses.schema';

@Injectable()
export class InteractiveModulesService {
  constructor(
    @InjectModel(Quiz.name) private readonly quizModel: Model<QuizDocument>,
    @InjectModel(Response.name)
    private readonly responseModel: Model<ResponseDocument>,
  ) {}

  // Create a new quiz
  async createQuiz(quiz: Quiz): Promise<Quiz> {
    const newQuiz = new this.quizModel(quiz);
    return newQuiz.save();
  }

  // Fetch all quizzes
  async getQuizzes(): Promise<Quiz[]> {
    return this.quizModel.find().exec();
  }

  // Submit a response
  async submitResponse(response: Response): Promise<Response> {
    const newResponse = new this.responseModel(response);
    return newResponse.save();
  }

  // Get responses by quiz ID
  async getResponses(quizId: string): Promise<Response[]> {
    return this.responseModel.find({ quizId }).exec();
  }
}
