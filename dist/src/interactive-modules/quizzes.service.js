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
exports.QuizzesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let QuizzesService = class QuizzesService {
    constructor(quizModel, moduleModel, questionBankModel) {
        this.quizModel = quizModel;
        this.moduleModel = moduleModel;
        this.questionBankModel = questionBankModel;
    }
    generateQuestions(count, type) {
        const questions = [];
        for (let i = 0; i < count; i++) {
            if (type === 'MCQ' || (type === 'Both' && i % 2 === 0)) {
                questions.push({
                    question: `MCQ Question ${i + 1}?`,
                    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
                    answer: 'Option 1',
                });
            }
            else {
                questions.push({
                    question: `True/False Question ${i + 1}?`,
                    options: ['True', 'False'],
                    answer: 'True',
                });
            }
        }
        return questions;
    }
    async createQuiz(moduleId, numberOfQuestions, questionType, difficulty) {
        const module = await this.moduleModel.findOne({ moduleId }).exec();
        if (!module) {
            throw new common_1.NotFoundException(`Module with ID '${moduleId}' not found`);
        }
        const existingQuiz = await this.quizModel.findOne({ moduleId }).exec();
        if (existingQuiz) {
            throw new common_1.ConflictException(`A quiz for module '${moduleId}' already exists`);
        }
        const questionBank = await this.questionBankModel.findOne({ moduleId }).exec();
        if (!questionBank || questionBank.questions.length === 0) {
            throw new common_1.NotFoundException(`No question bank found for module '${moduleId}'`);
        }
        const filteredQuestions = questionBank.questions.filter((q) => q.type === questionType && q.difficulty === difficulty);
        if (filteredQuestions.length < numberOfQuestions) {
            throw new common_1.ConflictException(`Not enough questions available. Found: ${filteredQuestions.length}`);
        }
        const selectedQuestions = filteredQuestions.sort(() => 0.5 - Math.random()).slice(0, numberOfQuestions);
        const newQuiz = new this.quizModel({
            quizId: `QUIZ-${Date.now()}`,
            moduleId,
            questionType,
            difficulty,
            numberOfQuestions,
            questions: selectedQuestions,
        });
        return await newQuiz.save();
    }
    async getQuizById(quizId) {
        const quiz = await this.quizModel.findOne({ quizId }).exec();
        if (!quiz) {
            throw new common_1.NotFoundException(`Quiz with ID '${quizId}' not found.`);
        }
        return quiz;
    }
    async generateQuizForStudent(quizId, studentId) {
        const quiz = await this.quizModel.findOne({ quizId }).exec();
        if (!quiz) {
            throw new common_1.NotFoundException(`Quiz with ID '${quizId}' not found`);
        }
        const questionBank = await this.questionBankModel.findOne({ moduleId: quiz.moduleId }).exec();
        if (!questionBank || questionBank.questions.length === 0) {
            throw new common_1.NotFoundException(`No question bank found for module '${quiz.moduleId}'`);
        }
        const filteredQuestions = questionBank.questions.filter((q) => q.type === quiz.questionType && q.difficulty === quiz.difficulty);
        if (filteredQuestions.length < quiz.numberOfQuestions) {
            throw new common_1.ConflictException(`Not enough questions available for this quiz. Expected: ${quiz.numberOfQuestions}, Found: ${filteredQuestions.length}`);
        }
        const randomizedQuestions = filteredQuestions.sort(() => 0.5 - Math.random()).slice(0, quiz.numberOfQuestions);
        return {
            quizId: quiz.quizId,
            moduleId: quiz.moduleId,
            questions: randomizedQuestions,
        };
    }
    async generateRandomizedQuiz(moduleId, numberOfQuestions, questionTypes) {
        const module = await this.moduleModel.findOne({ moduleId }).exec();
        if (!module) {
            throw new common_1.NotFoundException(`Module with ID '${moduleId}' not found`);
        }
        const existingQuiz = await this.quizModel.findOne({ moduleId }).exec();
        if (existingQuiz) {
            throw new common_1.ConflictException(`A quiz for module '${moduleId}' already exists`);
        }
        const questionBank = await this.questionBankModel.findOne({ moduleId }).exec();
        if (!questionBank || questionBank.questions.length === 0) {
            throw new common_1.NotFoundException(`No questions found in the question bank for module '${moduleId}'`);
        }
        let filteredQuestions = [];
        if (questionTypes.includes('both')) {
            filteredQuestions = questionBank.questions;
        }
        else {
            filteredQuestions = questionBank.questions.filter((q) => questionTypes.includes(q.type));
        }
        if (filteredQuestions.length < numberOfQuestions) {
            throw new common_1.ConflictException(`Not enough questions available. Requested: ${numberOfQuestions}, Available: ${filteredQuestions.length}`);
        }
        const selectedQuestions = filteredQuestions
            .sort(() => Math.random() - 0.5)
            .slice(0, numberOfQuestions);
        const newQuiz = new this.quizModel({
            quizId: `QZ-${Date.now()}`,
            moduleId,
            questions: selectedQuestions,
        });
        return await newQuiz.save();
    }
    async getQuizByModule(moduleId) {
        const quiz = await this.quizModel.findOne({ moduleId }).exec();
        if (!quiz) {
            throw new common_1.NotFoundException(`Quiz for module ID '${moduleId}' not found`);
        }
        return quiz;
    }
    async getAllQuizzes() {
        return this.quizModel.find().exec();
    }
    async updateQuiz(quizId, updatedData) {
        const quiz = await this.quizModel.findOne({ quizId }).exec();
        if (!quiz) {
            throw new common_1.NotFoundException(`Quiz with ID '${quizId}' not found`);
        }
        if (quiz.isAttempted) {
            throw new common_1.ConflictException(`Quiz with ID '${quizId}' cannot be edited as it has been attempted`);
        }
        Object.assign(quiz, updatedData);
        return await quiz.save();
    }
    async deleteQuiz(quizId) {
        const quiz = await this.quizModel.findOne({ quizId }).exec();
        if (!quiz) {
            throw new common_1.NotFoundException(`Quiz with ID '${quizId}' not found.`);
        }
        if (quiz.isAttempted) {
            throw new common_1.ConflictException(`Quiz with ID '${quizId}' cannot be deleted because it has already been attempted by students.`);
        }
        await this.quizModel.deleteOne({ quizId }).exec();
        return `Quiz with ID '${quizId}' has been successfully deleted.`;
    }
};
exports.QuizzesService = QuizzesService;
exports.QuizzesService = QuizzesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Quiz')),
    __param(1, (0, mongoose_1.InjectModel)('Module')),
    __param(2, (0, mongoose_1.InjectModel)('QuestionBank')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], QuizzesService);
//# sourceMappingURL=quizzes.service.js.map