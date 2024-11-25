import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recommendation } from './recommendation.schema';
--DTO??

@Injectable()
export class InteractionService {
  constructor(
    @InjectModel(UserInteraction.name)
    private interactionModel: Model<UserInteractionDocument>,
  ) {}

  