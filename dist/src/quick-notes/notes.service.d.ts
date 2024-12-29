import { Model } from 'mongoose';
import { Note } from './notes.schema';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
export declare class QuickNotesService {
    private noteModel;
    constructor(noteModel: Model<Note>);
    create(createNoteDto: CreateNoteDto): Promise<Note>;
    findByModule(moduleId: string): Promise<Note[]>;
    update(title: string, updateNoteDto: UpdateNoteDto): Promise<Note>;
    delete(title: string): Promise<void>;
}
