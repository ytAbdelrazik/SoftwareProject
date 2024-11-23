import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InteractionController } from './interaction.controller';
import { InteractionService } from './interaction.service';
import { UserInteraction, UserInteractionSchema } from './interaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserInteraction.name, schema: UserInteractionSchema },
    ]),
  ],
  controllers: [InteractionController],
  providers: [InteractionService],
})
export class InteractionModule {}