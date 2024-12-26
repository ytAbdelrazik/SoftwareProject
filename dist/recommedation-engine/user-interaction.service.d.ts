import { Model } from 'mongoose';
import { UserInteraction, UserInteractionDocument } from './user-interaction.schema';
import { CreateInteractionDto } from './dtos/user-interaction.dto';
export declare class InteractionService {
    private interactionModel;
    constructor(interactionModel: Model<UserInteractionDocument>);
    createInteraction(createInteractionDto: CreateInteractionDto): Promise<UserInteraction>;
}
