"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const course_service_1 = require("./course.service");
const course_controller_1 = require("./course.controller");
const course_schema_1 = require("./course.schema");
const student_schema_1 = require("./student.schema");
const instructor_schema_1 = require("./instructor.schema");
const users_module_1 = require("../user-managment/users.module");
const discussions_schema_1 = require("./discussions/discussions.schema");
let CourseModule = class CourseModule {
};
exports.CourseModule = CourseModule;
exports.CourseModule = CourseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Course', schema: course_schema_1.CourseSchema },
                { name: 'Student', schema: student_schema_1.StudentSchema, collection: 'students' },
                { name: 'Instructor', schema: instructor_schema_1.InstructorSchema, collection: 'instructors' },
                { name: 'Discussion', schema: discussions_schema_1.DiscussionSchema,
                },
            ]),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule)
        ],
        controllers: [course_controller_1.CourseController],
        providers: [course_service_1.CourseService],
        exports: [mongoose_1.MongooseModule, course_service_1.CourseService],
    })
], CourseModule);
//# sourceMappingURL=course.module.js.map