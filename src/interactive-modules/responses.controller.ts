import { Body, Controller, Post } from '@nestjs/common';
import { ResponseService } from './responses.service';
import { SubmitResponseDto } from 'src/interactive-modules/dtos/submit-response.dto';

@Controller('responses')
export class ResponsesController {

constructor(private readonly responseService: ResponseService) {}

@Post()
async createResponse(@Body() submitResponseDto: SubmitResponseDto) {
}

}