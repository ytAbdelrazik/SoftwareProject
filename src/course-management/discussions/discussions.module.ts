import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscussionsController } from './discussions.controller';
import { DiscussionsService } from './discussions.service';
import { Discussion, DiscussionSchema } from './discussions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Discussion.name, schema: DiscussionSchema }]),
  ],
  controllers: [DiscussionsController],
  providers: [DiscussionsService],
})
export class DiscussionsModule {}