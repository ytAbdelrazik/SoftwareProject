import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Response, ResponseSchema } from './responses.schema';
import { ResponseService } from './responses.service';
import { ResponsesController } from './responses.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Response.name, schema: ResponseSchema }]),
  ],
  controllers: [ResponsesController],
  providers: [ResponseService],
  exports: [ResponseService], 
})
export class ResponseModule {}
