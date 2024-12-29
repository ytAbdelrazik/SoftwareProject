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
exports.QuickNotesController = void 0;
const common_1 = require("@nestjs/common");
const notes_service_1 = require("./notes.service");
const create_note_dto_1 = require("./dtos/create-note.dto");
const update_note_dto_1 = require("./dtos/update-note.dto");
let QuickNotesController = class QuickNotesController {
    constructor(quickNotesService) {
        this.quickNotesService = quickNotesService;
    }
    create(createNoteDto) {
        return this.quickNotesService.create(createNoteDto);
    }
    findByModule(moduleId) {
        return this.quickNotesService.findByModule(moduleId);
    }
    update(title, updateNoteDto) {
        return this.quickNotesService.update(title, updateNoteDto);
    }
    async autosave(title, updateNoteDto) {
        return this.quickNotesService.update(title, updateNoteDto);
    }
    delete(title) {
        return this.quickNotesService.delete(title);
    }
};
exports.QuickNotesController = QuickNotesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_note_dto_1.CreateNoteDto]),
    __metadata("design:returntype", void 0)
], QuickNotesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('module/:moduleId'),
    __param(0, (0, common_1.Param)('moduleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuickNotesController.prototype, "findByModule", null);
__decorate([
    (0, common_1.Patch)(':Title'),
    __param(0, (0, common_1.Param)('Title')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_note_dto_1.UpdateNoteDto]),
    __metadata("design:returntype", void 0)
], QuickNotesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('autosave/:title'),
    __param(0, (0, common_1.Param)('title')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_note_dto_1.UpdateNoteDto]),
    __metadata("design:returntype", Promise)
], QuickNotesController.prototype, "autosave", null);
__decorate([
    (0, common_1.Delete)(':Title'),
    __param(0, (0, common_1.Param)('Title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuickNotesController.prototype, "delete", null);
exports.QuickNotesController = QuickNotesController = __decorate([
    (0, common_1.Controller)('notes'),
    __metadata("design:paramtypes", [notes_service_1.QuickNotesService])
], QuickNotesController);
//# sourceMappingURL=notes.controller.js.map