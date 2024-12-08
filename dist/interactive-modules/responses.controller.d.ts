import { ResponseService } from './responses.service';
import { SubmitResponseDto } from 'src/interactive-modules/dtos/submit-response.dto';
export declare class ResponsesController {
    private readonly responseService;
    constructor(responseService: ResponseService);
    createResponse(submitResponseDto: SubmitResponseDto): Promise<void>;
}
