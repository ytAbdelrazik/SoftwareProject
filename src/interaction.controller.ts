import { Controller, Post, Body } from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';

@Controller('interactions')
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) {}

  @Post()
  async createInteraction(@Body() createInteractionDto: CreateInteractionDto) {
    return this.interactionService.createInteraction(createInteractionDto);
  }
}