import { Model } from 'mongoose';
import { Quiz, QuizDocument } from './quizzes.schema';
import { ModuleDocument } from '../course-management/module.schema';
import { CreateQuizDto } from './dtos/create-quiz.dto';
export declare class QuizzesService {
    private readonly quizModel;
    private readonly moduleModel;
    private readonly questionBankModel;
    constructor(quizModel: Model<QuizDocument>, moduleModel: Model<ModuleDocument>, questionBankModel: Model<any>);
    private generateQuestions;
    createQuiz(moduleId: string, numberOfQuestions: number, questionType: string, difficulty: string): Promise<Quiz>;
    getQuizById(quizId: string): Promise<Quiz>;
    generateQuizForStudent(quizId: string, studentId: string): Promise<any>;
    generateRandomizedQuiz(moduleId: string, numberOfQuestions: number, questionTypes: string[]): Promise<Quiz>;
    getQuizByModule(moduleId: string): Promise<Quiz>;
    getAllQuizzes(): Promise<Quiz[]>;
    updateQuiz(quizId: string, updatedData: Partial<CreateQuizDto>): Promise<Quiz>;
    deleteQuiz(quizId: string): Promise<string>;
}
