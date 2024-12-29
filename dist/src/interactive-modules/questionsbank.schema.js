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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionBankSchema = exports.QuestionBank = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let QuestionBank = class QuestionBank {
};
exports.QuestionBank = QuestionBank;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], QuestionBank.prototype, "moduleId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                question: { type: String, required: true },
                options: { type: [String], required: true },
                answer: { type: String, required: true },
                type: { type: String, enum: ['MCQ', 'TF'], required: true },
                difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], QuestionBank.prototype, "questions", void 0);
exports.QuestionBank = QuestionBank = __decorate([
    (0, mongoose_1.Schema)()
], QuestionBank);
exports.QuestionBankSchema = mongoose_1.SchemaFactory.createForClass(QuestionBank);
//# sourceMappingURL=questionsbank.schema.js.map