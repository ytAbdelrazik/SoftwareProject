import { QuickNotesService } from './notes.service';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
export declare class QuickNotesController {
    private readonly quickNotesService;
    constructor(quickNotesService: QuickNotesService);
    create(createNoteDto: CreateNoteDto): Promise<import("./notes.schema").Note>;
    findByModule(moduleId: string): Promise<import("./notes.schema").Note[]>;
    update(title: string, updateNoteDto: UpdateNoteDto): Promise<import("./notes.schema").Note>;
    autosave(title: string, updateNoteDto: UpdateNoteDto): Promise<import("./notes.schema").Note>;
    delete(title: string): Promise<void>;
}
