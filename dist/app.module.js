"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_module_1 = require("./user-managment/users.module");
const responses_module_1 = require("./interactive-modules/responses.module");
const user_interaction_module_1 = require("./recommedation-engine/user-interaction.module");
const recommendation_module_1 = require("./recommedation-engine/recommendation.module");
const performance_tracking_module_1 = require("./performance-tracking/performance-tracking.module");
const quizzes_module_1 = require("./interactive-modules/quizzes.module");
const course_module_1 = require("./course-management/course.module");
const module_module_1 = require("./course-management/module.module");
const student_schema_1 = require("./course-management/student.schema");
const instructor_schema_1 = require("./course-management/instructor.schema");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://ahmed:ahmed2006@cluster0.l8ikh.mongodb.net'),
            users_module_1.UserModule, responses_module_1.ResponseModule, user_interaction_module_1.InteractionModule, recommendation_module_1.RecommendationModule, performance_tracking_module_1.PerformanceTrackingModule, module_module_1.ModuleModule, quizzes_module_1.InteractiveModulesModule, course_module_1.CourseModule,
            mongoose_1.MongooseModule.forFeature([
                { name: 'Student', schema: student_schema_1.StudentSchema },
                { name: 'Instructor', schema: instructor_schema_1.InstructorSchema },
            ]),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map