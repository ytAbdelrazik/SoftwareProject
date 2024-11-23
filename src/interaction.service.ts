import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInteraction, UserInteractionDocument } from './interaction.schema';
import { CreateInteractionDto } from './dto/create-interaction.dto';

@Injectable()
export class InteractionService {
  constructor(
    @InjectModel(UserInteraction.name)
    private interactionModel: Model<UserInteractionDocument>,
  ) {}

  async createInteraction(createInteractionDto: CreateInteractionDto): Promise<UserInteraction> {
    const newInteraction = new this.interactionModel(createInteractionDto);
    return newInteraction.save();
  }
}