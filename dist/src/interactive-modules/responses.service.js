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
exports.ResponsesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ResponsesService = class ResponsesService {
    constructor(responseModel, quizModel) {
        this.responseModel = responseModel;
        this.quizModel = quizModel;
    }
    async submitResponse(studentId, quizId, answers) {
        const quiz = await this.quizModel.findOne({ quizId }).exec();
        if (!quiz) {
            throw new common_1.NotFoundException(`Quiz with ID '${quizId}' not found`);
        }
        if (quiz.isAttempted) {
            throw new common_1.ConflictException(`You can only take this quiz once.`);
        }
        let score = 0;
        const feedback = [];
        for (const answer of answers) {
            const question = quiz.questions.find((q) => q.question === answer.questionId);
            if (!question) {
                throw new common_1.NotFoundException(`Question with ID '${answer.questionId}' not found`);
            }
            const isCorrect = question.answer === answer.selectedOption;
            if (isCorrect) {
                score += 1;
            }
            else {
                feedback.push({
                    questionId: answer.questionId,
                    correctAnswer: question.answer,
                    yourAnswer: answer.selectedOption,
                });
            }
        }
        quiz.isAttempted = true;
        await quiz.save();
        return {
            studentId,
            quizId,
            score,
            feedback,
            message: score >= quiz.questions.length * 0.6 ? 'You passed!' : 'You need to study again!',
        };
    }
    async getFeedback(studentId, quizId) {
        const response = await this.responseModel.findOne({ studentId, quizId }).exec();
        if (!response) {
            throw new common_1.NotFoundException(`No response found for student ID '${studentId}' and quiz ID '${quizId}'`);
        }
        const quiz = await this.quizModel.findOne({ quizId }).exec();
        if (!quiz) {
            throw new common_1.NotFoundException(`Quiz with ID '${quizId}' not found`);
        }
        const feedback = response.answers.map((answer) => {
            const question = quiz.questions.find((q) => q.question === answer.questionId);
            if (!question)
                return { questionId: answer.questionId, feedback: 'Question not found in quiz' };
            return {
                questionId: answer.questionId,
                selectedOption: answer.selectedOption,
                correctOption: question.answer,
                isCorrect: answer.selectedOption === question.answer,
            };
        });
        return {
            score: response.score,
            feedback,
        };
    }
    async getResponse(quizId, studentId) {
        const response = await this.responseModel.findOne({ quizId, studentId }).exec();
        if (!response) {
            throw new common_1.NotFoundException(`Response not found for quiz ID '${quizId}' and student ID '${studentId}'`);
        }
        return response;
    }
};
exports.ResponsesService = ResponsesService;
exports.ResponsesService = ResponsesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Response')),
    __param(1, (0, mongoose_1.InjectModel)('Quiz')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ResponsesService);
//# sourceMappingURL=responses.service.js.map