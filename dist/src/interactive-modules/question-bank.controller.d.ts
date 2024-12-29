import { QuestionBankService } from './question-bank.service';
import { CreateQuestionDto } from './dtos/CreateQuestion.dto';
export declare class QuestionBankController {
    private readonly questionBankService;
    constructor(questionBankService: QuestionBankService);
    addQuestionBank(createQuestionBankDto: CreateQuestionDto): Promise<import("./questionsbank.schema").QuestionBank>;
    getQuestionBank(moduleId: string): Promise<import("./questionsbank.schema").QuestionBank>;
    editQuestion(moduleId: string, questionIndex: number, updatedQuestion: any): Promise<any>;
    deleteQuestion(moduleId: string, questionIndex: number): Promise<any>;
    addQuestionsToBank(moduleId: string, questions: any[]): Promise<import("./questionsbank.schema").QuestionBank>;
}
