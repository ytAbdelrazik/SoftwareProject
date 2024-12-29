"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const chat_service_1 = require("./chat.service");
const chat_controller_1 = require("./chat.controller");
const user_service_1 = require("../user-managment/user.service");
const course_service_1 = require("../course-management/course.service");
const course_schema_1 = require("../course-management/course.schema");
const users_schema_1 = require("../user-managment/users.schema");
const chat_schema_1 = require("./chat.schema");
const message_schema_1 = require("./message.schema");
const student_schema_1 = require("../course-management/student.schema");
const instructor_schema_1 = require("../course-management/instructor.schema");
const mongodb_1 = require("mongodb");
const admin_schema_1 = require("../user-managment/admin.schema");
const notifications_service_1 = require("../notifications/notifications.service");
const notifications_schema_1 = require("../notifications/notifications.schema");
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: chat_schema_1.Chat.name, schema: chat_schema_1.ChatSchema },
                { name: message_schema_1.Message.name, schema: message_schema_1.MessageSchema },
                { name: course_schema_1.Course.name, schema: course_schema_1.CourseSchema },
                { name: users_schema_1.User.name, schema: users_schema_1.UserSchema },
                { name: student_schema_1.Student.name, schema: student_schema_1.StudentSchema },
                { name: instructor_schema_1.Instructor.name, schema: instructor_schema_1.InstructorSchema },
                { name: mongodb_1.Admin.name, schema: admin_schema_1.AdminSchema },
                { name: notifications_schema_1.Notification.name, schema: notifications_schema_1.NotificationSchema }
            ]),
        ],
        providers: [chat_service_1.ChatService, course_service_1.CourseService, user_service_1.UserService, notifications_service_1.NotificationService],
        controllers: [chat_controller_1.ChatController],
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map