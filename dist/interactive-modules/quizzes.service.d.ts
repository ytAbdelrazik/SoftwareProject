import { Model } from 'mongoose';
import { Quiz, QuizDocument } from './quizzes.schema';
import { Response, ResponseDocument } from './responses.schema';
export declare class InteractiveModulesService {
    private readonly quizModel;
    private readonly responseModel;
    constructor(quizModel: Model<QuizDocument>, responseModel: Model<ResponseDocument>);
    createQuiz(quiz: Quiz): Promise<Quiz>;
    getQuizzes(): Promise<Quiz[]>;
    submitResponse(response: Response): Promise<Response>;
    getResponses(quizId: string): Promise<Response[]>;
}
