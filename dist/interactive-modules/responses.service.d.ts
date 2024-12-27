import { Response } from './responses.schema';
import { Model } from 'mongoose';
export declare class ResponsesService {
}
export declare class ResponseService {
    private responseModel;
    constructor(responseModel: Model<Response>);
}
