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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const course_service_1 = require("../course-management/course.service");
let UserService = class UserService {
    getAllEnrolledCourses(userId) {
        throw new Error('Method not implemented.');
    }
    constructor(userModel, studentModel, instructorModel, adminModel, courseModel, CourseService) {
        this.userModel = userModel;
        this.studentModel = studentModel;
        this.instructorModel = instructorModel;
        this.adminModel = adminModel;
        this.courseModel = courseModel;
        this.CourseService = CourseService;
    }
    async getUserById(userId) {
        console.log(`Fetching user with ID: ${userId}`);
        let user = await this.studentModel.findOne({ userId }).exec();
        if (user) {
            return user;
        }
        let x = await this.instructorModel.findOne({ userId }).exec();
        if (x) {
            return x;
        }
        let y = await this.adminModel.findOne({ userId }).exec();
        if (y) {
            return y;
        }
        throw new common_1.NotFoundException(`User with ID ${userId} not found`);
    }
    getModelByRole(role) {
        switch (role) {
            case 'student':
                return this.studentModel;
            case 'instructor':
                return this.instructorModel;
            case 'admin':
                return this.adminModel;
            default:
                throw new common_1.NotFoundException(`Invalid role: ${role}`);
        }
    }
    generateUserId(role) {
        const randomNumber = Math.floor(10000 + Math.random() * 90000);
        switch (role) {
            case 'student':
                return `ST${randomNumber}`;
            case 'instructor':
                return `IS${randomNumber}`;
            case 'admin':
                return `AD${randomNumber}`;
            default:
                throw new Error('Invalid role');
        }
    }
    async createUser(userData) {
        const model = this.getModelByRole(userData.role);
        const existingUser = await model.findOne({ email: userData.email }).exec();
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        let uniqueUserId = '';
        let isUnique = false;
        while (!isUnique) {
            uniqueUserId = this.generateUserId(userData.role);
            const userIdCheck = await model.findOne({ userId: uniqueUserId }).exec();
            isUnique = !userIdCheck;
        }
        userData.userId = uniqueUserId;
        try {
            return await model.create(userData);
        }
        catch (error) {
            console.error('Error creating user:', error);
            if (error.code === 11000) {
                throw new common_1.ConflictException('Duplicate key error: User already exists');
            }
            throw new common_1.InternalServerErrorException('Failed to create user');
        }
    }
    async updateUser(userId, role, updateData) {
        const model = this.getModelByRole(role);
        const user = await model.findOne({ userId }).exec();
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        if ('userId' in updateData) {
            delete updateData.userId;
        }
        if (updateData.email) {
            const existingUser = await model.findOne({
                email: updateData.email,
                userId: { $ne: userId },
            }).exec();
            if (existingUser) {
                throw new common_1.ConflictException('Email is already in use');
            }
        }
        Object.assign(user, updateData);
        return user.save();
    }
    async getAllByRole(role) {
        const model = this.getModelByRole(role);
        return model.find().exec();
    }
    async getEnrolledCourses(userId) {
        const student = await this.studentModel.findOne({ userId }).exec();
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${userId} not found`);
        }
        return student.enrolledCourses;
    }
    async getCreatedCourses(userId) {
        const instructor = await this.instructorModel.findOne({ userId }).exec();
        if (!instructor) {
            throw new common_1.NotFoundException(`Instructor with ID ${userId} not found`);
        }
        return instructor.createdCourses;
    }
    async addCoursesToStudent(userId, courseIds) {
        const student = await this.studentModel.findOne({ userId }).exec();
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${userId} not found`);
        }
        const courses = await this.courseModel.find({
            courseId: { $in: courseIds },
        }).exec();
        if (courses.length !== courseIds.length) {
            throw new common_1.NotFoundException('One or more courses not found');
        }
        const currentCourseIds = student.enrolledCourses.map(course => course.toString());
        const newCourseIds = courseIds.filter(courseId => !currentCourseIds.includes(courseId));
        const newCourses = await this.courseModel.find({
            courseId: { $in: newCourseIds },
        }).exec();
        student.enrolledCourses = [...student.enrolledCourses, ...newCourses];
        return student.save();
    }
    async findByEmail(email) {
        const student = await this.studentModel.findOne({ email }).exec();
        if (student)
            return student;
        const instructor = await this.instructorModel.findOne({ email }).exec();
        if (instructor)
            return instructor;
        const admin = await this.adminModel.findOne({ email }).exec();
        return admin;
    }
    async searchStudentsByName(name, limit, offset) {
        return this.studentModel
            .find({
            name: { $regex: name, $options: 'i' },
        })
            .limit(limit)
            .skip(offset)
            .exec();
    }
    async istheinstructorInCourse(courseId, instructorId) {
        const instructorCourses = await this.getCreatedCourses(instructorId);
        const course = await this.CourseService.getCourseById(courseId);
        if (!course) {
            throw new Error('Course not found');
        }
        return instructorCourses.some(createdCourse => createdCourse.courseId === course.courseId);
    }
    async isStudentEnrolledInCourse(courseId, studentId) {
        const enrolledCoursess = await this.getEnrolledCourses(studentId);
        const course = await this.CourseService.getCourseById(courseId);
        if (!course) {
            throw new Error('Course not found');
        }
        console.log(course.courseId);
        return enrolledCoursess.some(enrolledCourse => enrolledCourse.courseId === course.courseId);
    }
    async updateCourseAvailability(courseId, isAvailable) {
        const course = await this.courseModel.findOne({ courseId }).exec();
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${courseId} not found`);
        }
        course.isAvailable = isAvailable;
        return course.save();
    }
    async deleteUser(userId) {
        const user = await this.userModel.findOne({ userId }).exec();
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        await this.userModel.deleteOne({ userId }).exec();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("User")),
    __param(1, (0, mongoose_1.InjectModel)('Student')),
    __param(2, (0, mongoose_1.InjectModel)('Instructor')),
    __param(3, (0, mongoose_1.InjectModel)('Admin')),
    __param(4, (0, mongoose_1.InjectModel)('Course')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        course_service_1.CourseService])
], UserService);
//# sourceMappingURL=user.service.js.map