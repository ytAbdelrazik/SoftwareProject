"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickNotesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const notes_schema_1 = require("./notes.schema");
let QuickNotesService = class QuickNotesService {
    constructor(noteModel) {
        this.noteModel = noteModel;
    }
    async create(createNoteDto) {
        const note = new this.noteModel(createNoteDto);
        return note.save();
    }
    async findByModule(moduleId) {
        return this.noteModel.find({ moduleId }).exec();
    }
    async update(title, updateNoteDto) {
        const note = await this.noteModel.findOneAndUpdate({ title }, { $set: updateNoteDto, $currentDate: { updatedAt: true } }, { new: true });
        if (!note) {
            throw new common_1.NotFoundException('Note with the specified title not found');
        }
        return note;
    }
    async delete(title) {
        const result = await this.noteModel.findOneAndDelete({ title });
        if (!result) {
            throw new common_1.NotFoundException('Note not found');
        }
    }
};
exports.QuickNotesService = QuickNotesService;
exports.QuickNotesService = QuickNotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(notes_schema_1.Note.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], QuickNotesService);
//# sourceMappingURL=notes.service.js.map