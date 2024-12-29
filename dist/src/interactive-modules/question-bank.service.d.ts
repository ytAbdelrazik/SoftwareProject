import { Model } from 'mongoose';
import { QuestionBank, QuestionBankDocument } from './questionsbank.schema';
import { CreateQuestionDto } from './dtos/CreateQuestion.dto';
export declare class QuestionBankService {
    private readonly questionBankModel;
    constructor(questionBankModel: Model<QuestionBankDocument>);
    addQuestion(createQuestionBankDto: CreateQuestionDto): Promise<QuestionBank>;
    getQuestionBankByModule(moduleId: string): Promise<QuestionBank>;
    editQuestion(moduleId: string, questionIndex: number, updatedQuestion: {
        question?: string;
        options?: string[];
        answer?: string;
        type?: 'MCQ' | 'TF';
        difficulty?: 'easy' | 'medium' | 'hard';
    }): Promise<any>;
    deleteQuestion(moduleId: string, questionIndex: number): Promise<any>;
    addQuestionsToBank(moduleId: string, questions: any[]): Promise<QuestionBank>;
}
