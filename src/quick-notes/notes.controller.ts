import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { QuickNotesService } from './notes.service';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';

@Controller('notes')
export class QuickNotesController {
  constructor(private readonly quickNotesService: QuickNotesService) {}

@Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.quickNotesService.create(createNoteDto);
  }

@Get(':userId')
  findByUser(@Param('userId') userId: string) {
    return this.quickNotesService.findByUser(userId);
  }

@Patch(':Title') //patch for updating not posting
  update(@Param('Title') title: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.quickNotesService.update(title, updateNoteDto);
  }

@Delete(':Title')
  delete(@Param('Title') title: string) {
    return this.quickNotesService.delete(title);
  }
}
