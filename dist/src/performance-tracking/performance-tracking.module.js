"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceTrackingModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const performance_tracking_controller_1 = require("./performance-tracking.controller");
const performance_tracking_service_1 = require("./performance-tracking.service");
const progress_schema_1 = require("./progress.schema");
const user_interaction_schema_1 = require("../recommedation-engine/user-interaction.schema");
const course_module_1 = require("../course-management/course.module");
const module_schema_1 = require("../course-management/module.schema");
const module_module_1 = require("../course-management/module.module");
const quizzes_schema_1 = require("../interactive-modules/quizzes.schema");
const course_schema_1 = require("../course-management/course.schema");
const modulerating_schema_1 = require("./modulerating.schema");
const responses_schema_1 = require("../interactive-modules/responses.schema");
const users_schema_1 = require("../user-managment/users.schema");
const instructorrating_schema_1 = require("./instructorrating.schema");
const jwt_1 = require("@nestjs/jwt");
const responses_module_1 = require("../interactive-modules/responses.module");
let PerformanceTrackingModule = class PerformanceTrackingModule {
};
exports.PerformanceTrackingModule = PerformanceTrackingModule;
exports.PerformanceTrackingModule = PerformanceTrackingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: progress_schema_1.Progress.name, schema: progress_schema_1.ProgressSchema },
                { name: user_interaction_schema_1.UserInteraction.name, schema: user_interaction_schema_1.UserInteractionSchema },
                { name: common_1.Module.name, schema: module_schema_1.ModuleSchema },
                { name: course_schema_1.Course.name, schema: course_schema_1.CourseSchema },
                { name: quizzes_schema_1.Quiz.name, schema: quizzes_schema_1.QuizSchema },
                { name: modulerating_schema_1.Rating.name, schema: modulerating_schema_1.RatingSchema },
                { name: Response.name, schema: responses_schema_1.ResponseSchema },
                { name: users_schema_1.User.name, schema: users_schema_1.UserSchema },
                { name: instructorrating_schema_1.InstructorRating.name, schema: instructorrating_schema_1.InstructorRatingSchema }
            ]),
            course_module_1.CourseModule,
            responses_module_1.ResponsesModule,
            module_module_1.ModuleModule,
            jwt_1.JwtModule.register({}),
        ],
        controllers: [performance_tracking_controller_1.PerformanceTrackingController],
        providers: [performance_tracking_service_1.PerformanceTrackingService],
    })
], PerformanceTrackingModule);
//# sourceMappingURL=performance-tracking.module.js.map