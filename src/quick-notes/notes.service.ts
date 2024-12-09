import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './notes.schema';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';

@Injectable()
export class QuickNotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

//create new note + store in db
  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const note = new this.noteModel(createNoteDto); //create
    return note.save(); //returns created note saved in the db 'note.save'
  }

//get a certain user's notes
  async findByUser(userId: string): Promise<Note[]> {
    return this.noteModel.find({ userId }).exec();
  }

//to update existinf notes
  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.noteModel.findByIdAndUpdate(id, updateNoteDto, {
      new: true,
    });
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }
  
//del note by id
  async delete(id: string): Promise<void> {
    const result = await this.noteModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Note not found');
    }
  }
}
