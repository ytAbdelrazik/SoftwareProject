"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const roles_guard_1 = require("./roles.guard");
const jwt_1 = require("@nestjs/jwt");
const student_schema_1 = require("../course-management/student.schema");
const instructor_schema_1 = require("../course-management/instructor.schema");
const users_schema_1 = require("./users.schema");
const failed_login_schema_1 = require("./failed-login.schema");
const core_1 = require("@nestjs/core");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Student', schema: student_schema_1.StudentSchema },
                { name: 'Instructor', schema: instructor_schema_1.InstructorSchema },
                { name: 'Admin', schema: users_schema_1.UserSchema },
                { name: 'FailedLogin', schema: failed_login_schema_1.FailedLoginSchema },
            ]),
            jwt_1.JwtModule.register({
                secret: 'ahmed',
                signOptions: { expiresIn: '1h' },
            }),
        ],
        controllers: [user_controller_1.UserController],
        providers: [
            user_service_1.UserService,
            roles_guard_1.RolesGuard,
            core_1.Reflector,
        ],
        exports: [
            user_service_1.UserService,
            jwt_1.JwtModule,
        ],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map