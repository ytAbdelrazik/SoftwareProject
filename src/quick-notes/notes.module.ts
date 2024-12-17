import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuickNotesService } from './notes.service';
import { QuickNotesController } from './notes.controller';
import { NoteSchema } from './notes.schema';


@Module({
    imports: [
      MongooseModule.forFeature([
        { name: 'Note', schema: NoteSchema }
      ]),
    ],
    controllers: [QuickNotesController],
    providers: [QuickNotesService],
    exports: [], // Export MongooseModule for reuse in other modules
  })
export class QuickNotesModule {}

