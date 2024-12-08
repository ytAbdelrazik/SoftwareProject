import { InteractionService } from './user-interaction.service';
import { CreateInteractionDto } from './dtos/user-interaction.dto';
export declare class InteractionController {
    private readonly interactionService;
    constructor(interactionService: InteractionService);
    createInteraction(createInteractionDto: CreateInteractionDto): Promise<import("./user-interaction.schema").UserInteraction>;
}
