import { InteractiveModulesService } from './quizzes.service';
import { Quiz } from './quizzes.schema';
import { Response } from './responses.schema';
export declare class InteractiveModulesController {
    private readonly interactiveModulesService;
    constructor(interactiveModulesService: InteractiveModulesService);
    createQuiz(quiz: Quiz): Promise<Quiz>;
    getQuizzes(): Promise<Quiz[]>;
    submitResponse(response: Response): Promise<Response>;
    getResponses(quizId: string): Promise<Response[]>;
}
