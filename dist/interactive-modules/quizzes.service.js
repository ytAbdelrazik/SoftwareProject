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
exports.InteractiveModulesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const quizzes_schema_1 = require("./quizzes.schema");
const responses_schema_1 = require("./responses.schema");
let InteractiveModulesService = class InteractiveModulesService {
    constructor(quizModel, responseModel) {
        this.quizModel = quizModel;
        this.responseModel = responseModel;
    }
    async createQuiz(quiz) {
        const newQuiz = new this.quizModel(quiz);
        return newQuiz.save();
    }
    async getQuizzes() {
        return this.quizModel.find().exec();
    }
    async submitResponse(response) {
        const newResponse = new this.responseModel(response);
        return newResponse.save();
    }
    async getResponses(quizId) {
        return this.responseModel.find({ quizId }).exec();
    }
};
exports.InteractiveModulesService = InteractiveModulesService;
exports.InteractiveModulesService = InteractiveModulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(quizzes_schema_1.Quiz.name)),
    __param(1, (0, mongoose_1.InjectModel)(responses_schema_1.Response.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], InteractiveModulesService);
//# sourceMappingURL=quizzes.service.js.map