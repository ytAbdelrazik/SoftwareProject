import { Injectable } from '@nestjs/common';
import { Response } from './responses.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ResponsesService {}
@Injectable()
export class ResponseService {
  constructor(@InjectModel(Response.name) private responseModel: Model<Response>) {}}