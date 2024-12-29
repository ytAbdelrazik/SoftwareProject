import { Model } from 'mongoose';
import { Response, ResponseDocument } from './responses.schema';
import { QuizDocument } from '../interactive-modules/quizzes.schema';
export declare class ResponsesService {
    private readonly responseModel;
    private readonly quizModel;
    constructor(responseModel: Model<ResponseDocument>, quizModel: Model<QuizDocument>);
    submitResponse(studentId: string, quizId: string, answers: {
        questionId: string;
        selectedOption: string;
    }[]): Promise<any>;
    getFeedback(studentId: string, quizId: string): Promise<any>;
    getResponse(quizId: string, studentId: string): Promise<Response>;
}
