import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dtos/create-quiz.dto';
export declare class QuizzesController {
    private readonly quizzesService;
    constructor(quizzesService: QuizzesService);
    createQuiz(moduleId: string, numberOfQuestions: number, questionType: string, difficulty: string): Promise<import("./quizzes.schema").Quiz>;
    startQuiz(quizId: string, req: any): Promise<any>;
    getQuizByModule(moduleId: string): Promise<import("./quizzes.schema").Quiz>;
    updateQuiz(quizId: string, updatedData: Partial<CreateQuizDto>): Promise<import("./quizzes.schema").Quiz>;
    deleteQuiz(quizId: string): Promise<string>;
}
