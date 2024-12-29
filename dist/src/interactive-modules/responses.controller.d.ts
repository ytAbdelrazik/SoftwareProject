import { ResponsesService } from './responses.service';
export declare class ResponsesController {
    private readonly responsesService;
    constructor(responsesService: ResponsesService);
    submitAnswers(quizId: string, answers: {
        questionId: string;
        selectedOption: string;
    }[], req: any): Promise<any>;
    getFeedback(req: any, quizId: string): Promise<any>;
}
