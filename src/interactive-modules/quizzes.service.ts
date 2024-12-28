import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz, QuizDocument } from './quizzes.schema';
import { Module, ModuleDocument } from '../course-management/module.schema';
import { CreateQuizDto } from './dtos/create-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel('Quiz') private readonly quizModel: Model<QuizDocument>,
    @InjectModel('Module') private readonly moduleModel: Model<ModuleDocument>,
    @InjectModel('QuestionBank') private readonly questionBankModel: Model<any>, // Correct injection
  ) {}




  private generateQuestions(count: number, type: 'MCQ' | 'True/False' | 'Both'): { question: string; options: string[]; answer: string }[] {
    const questions = [];

    for (let i = 0; i < count; i++) {
      if (type === 'MCQ' || (type === 'Both' && i % 2 === 0)) {
        questions.push({
          question: `MCQ Question ${i + 1}?`,
          options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
          answer: 'Option 1',
        });
      } else {
        questions.push({
          question: `True/False Question ${i + 1}?`,
          options: ['True', 'False'],
          answer: 'True',
        });
      }
    }

    return questions;
  }


  async createQuiz(moduleId: string, createQuizDto: CreateQuizDto): Promise<Quiz> {
    const { numberOfQuestions, questionType, difficulty } = createQuizDto;
  
    // Validate module existence
    const module = await this.moduleModel.findOne({ moduleId }).exec();
    if (!module) {
      throw new NotFoundException(`Module with ID '${moduleId}' not found`);
    }
  
    // Check for existing quiz for the module
    const existingQuiz = await this.quizModel.findOne({ moduleId }).exec();
    if (existingQuiz) {
      throw new ConflictException(`A quiz for module '${moduleId}' already exists`);
    }
  
    // Fetch question bank for the module
    const questionBank = await this.questionBankModel.findOne({ moduleId }).exec();
    if (!questionBank || questionBank.questions.length === 0) {
      throw new NotFoundException(`No question bank found for module '${moduleId}'`);
    }
  
    // Filter questions by type
    let filteredQuestions = [];
    if (questionType === 'both') {
      filteredQuestions = questionBank.questions;
    } else {
      filteredQuestions = questionBank.questions.filter(q => q.type === questionType);
    }
  
    // Check if enough questions are available
    if (filteredQuestions.length < numberOfQuestions) {
      throw new ConflictException(
        `Not enough questions of type '${questionType}' in the question bank. Available: ${filteredQuestions.length}`
      );
    }
  
    // Randomly select the required number of questions
    const selectedQuestions = filteredQuestions
      .sort(() => 0.5 - Math.random()) // Shuffle the array
      .slice(0, numberOfQuestions);
  
    // Create and save the quiz
    const newQuiz = new this.quizModel({
      quizId: createQuizDto.quizId,
      moduleId,
      difficulty,
      questions: selectedQuestions,
    });
    return await newQuiz.save();
  }
  
  async generateRandomizedQuiz(moduleId: string, numberOfQuestions: number, questionTypes: string[]): Promise<Quiz> {
    // Validate the module exists
    const module = await this.moduleModel.findOne({ moduleId }).exec();
    if (!module) {
      throw new NotFoundException(`Module with ID '${moduleId}' not found`);
    }

    // Check for an existing quiz for the module
    const existingQuiz = await this.quizModel.findOne({ moduleId }).exec();
    if (existingQuiz) {
      throw new ConflictException(`A quiz for module '${moduleId}' already exists`);
    }

    // Fetch questions from the question bank
    const questionBank = await this.questionBankModel.findOne({ moduleId }).exec();
    if (!questionBank || questionBank.questions.length === 0) {
      throw new NotFoundException(`No questions found in the question bank for module '${moduleId}'`);
    }

    // Filter questions based on the requested types
    let filteredQuestions = [];
    if (questionTypes.includes('both')) {
      filteredQuestions = questionBank.questions;
    } else {
      filteredQuestions = questionBank.questions.filter((q) => questionTypes.includes(q.type));
    }

    // Ensure there are enough questions in the bank
    if (filteredQuestions.length < numberOfQuestions) {
      throw new ConflictException(
        `Not enough questions available. Requested: ${numberOfQuestions}, Available: ${filteredQuestions.length}`
      );
    }

    // Randomly select questions
    const selectedQuestions = filteredQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, numberOfQuestions);

    // Create the quiz
    const newQuiz = new this.quizModel({
      quizId: `QZ-${Date.now()}`, // Generate a unique quiz ID
      moduleId,
      questions: selectedQuestions,
    });

    return await newQuiz.save();
  }

  



  /**
   * Retrieve a quiz associated with a specific module.
   * @param moduleId - The ID of the module.
   * @returns The quiz document.
   * @throws NotFoundException if the quiz is not found.
   */
  async getQuizByModule(moduleId: string): Promise<Quiz> {
    const quiz = await this.quizModel.findOne({ moduleId }).exec();
    if (!quiz) {
      throw new NotFoundException(`Quiz for module ID '${moduleId}' not found`);
    }
    return quiz;
  }

  /**
   * Retrieve all quizzes.
   * @returns A list of all quizzes.
   */
  async getAllQuizzes(): Promise<Quiz[]> {
    return this.quizModel.find().exec();
  }


  async updateQuiz(quizId: string, updatedData: Partial<CreateQuizDto>): Promise<Quiz> {
    const quiz = await this.quizModel.findOne({ quizId }).exec();
  
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID '${quizId}' not found`);
    }
  
    if (quiz.isAttempted) {
      throw new ConflictException(`Quiz with ID '${quizId}' cannot be edited as it has been attempted`);
    }
  
    Object.assign(quiz, updatedData);
    return await quiz.save();
  }

  async deleteQuiz(quizId: string): Promise<string> {
    // Retrieve the quiz
    const quiz = await this.quizModel.findOne({ quizId }).exec();
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID '${quizId}' not found.`);
    }
  
    // Check if the quiz has been attempted
    if (quiz.isAttempted) {
      throw new ConflictException(
        `Quiz with ID '${quizId}' cannot be deleted because it has already been attempted by students.`
      );
    }
  
    // Delete the quiz
    await this.quizModel.deleteOne({ quizId }).exec();
    return `Quiz with ID '${quizId}' has been successfully deleted.`;
  }

  
  
  
}
