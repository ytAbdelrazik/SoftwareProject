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
exports.QuestionBankService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let QuestionBankService = class QuestionBankService {
    constructor(questionBankModel) {
        this.questionBankModel = questionBankModel;
    }
    async addQuestion(createQuestionBankDto) {
        const existingQuestionBank = await this.questionBankModel.findOne({
            moduleId: createQuestionBankDto.moduleId,
        }).exec();
        if (existingQuestionBank) {
            throw new common_1.ConflictException('A question bank for this module already exists');
        }
        const newQuestionBank = new this.questionBankModel(createQuestionBankDto);
        return await newQuestionBank.save();
    }
    async getQuestionBankByModule(moduleId) {
        const questionBank = await this.questionBankModel.findOne({ moduleId }).exec();
        if (!questionBank) {
            throw new common_1.NotFoundException(`No question bank found for module ID '${moduleId}'`);
        }
        return questionBank;
    }
    async editQuestion(moduleId, questionIndex, updatedQuestion) {
        const questionBank = await this.questionBankModel.findOne({ moduleId }).exec();
        if (!questionBank) {
            throw new common_1.NotFoundException(`Question bank for module ID '${moduleId}' not found`);
        }
        if (questionIndex < 0 || questionIndex >= questionBank.questions.length) {
            throw new common_1.NotFoundException(`Invalid question index '${questionIndex}'`);
        }
        const question = questionBank.questions[questionIndex];
        if (updatedQuestion.question)
            question.question = updatedQuestion.question;
        if (updatedQuestion.options)
            question.options = updatedQuestion.options;
        if (updatedQuestion.answer)
            question.answer = updatedQuestion.answer;
        if (updatedQuestion.type)
            question.type = updatedQuestion.type;
        if (updatedQuestion.difficulty)
            question.difficulty = updatedQuestion.difficulty;
        await questionBank.save();
        return { message: 'Question updated successfully', updatedQuestion: question };
    }
    async deleteQuestion(moduleId, questionIndex) {
        const questionBank = await this.questionBankModel.findOne({ moduleId }).exec();
        if (!questionBank) {
            throw new common_1.NotFoundException(`Question bank for module ID '${moduleId}' not found`);
        }
        if (questionIndex < 0 || questionIndex >= questionBank.questions.length) {
            throw new common_1.NotFoundException(`Invalid question index '${questionIndex}'`);
        }
        questionBank.questions.splice(questionIndex, 1);
        await questionBank.save();
        return { message: 'Question deleted successfully' };
    }
    async addQuestionsToBank(moduleId, questions) {
        const questionBank = await this.questionBankModel.findOne({ moduleId }).exec();
        if (!questionBank) {
            throw new common_1.NotFoundException(`Question bank for module ID '${moduleId}' not found.`);
        }
        questions.forEach((q, index) => {
            if (!q.difficulty) {
                throw new common_1.BadRequestException(`Difficulty is required for question ${index + 1}.`);
            }
        });
        questionBank.questions.push(...questions);
        return await questionBank.save();
    }
};
exports.QuestionBankService = QuestionBankService;
exports.QuestionBankService = QuestionBankService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('QuestionBank')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], QuestionBankService);
//# sourceMappingURL=question-bank.service.js.map