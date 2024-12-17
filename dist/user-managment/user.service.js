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
let UserService = class UserService {
    constructor(studentModel, instructorModel, adminModel) {
        this.studentModel = studentModel;
        this.instructorModel = instructorModel;
        this.adminModel = adminModel;
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
        return instructor.coursesCreated;
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
    async findById(userId, role) {
        const model = this.getModelByRole(role);
        const user = await model.findOne({ userId }).exec();
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        return user;
    }
    async addCoursesToStudent(userId, courseIds) {
        const student = await this.studentModel.findOne({ userId }).exec();
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${userId} not found`);
        }
        student.enrolledCourses = Array.from(new Set([...student.enrolledCourses, ...courseIds]));
        return student.save();
    }
    async addCoursesToInstructor(userId, courseIds) {
        const instructor = await this.instructorModel.findOne({ userId }).exec();
        if (!instructor) {
            throw new common_1.NotFoundException(`Instructor with ID ${userId} not found`);
        }
        instructor.coursesCreated = Array.from(new Set([...instructor.coursesCreated, ...courseIds]));
        return instructor.save();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Student')),
    __param(1, (0, mongoose_1.InjectModel)('Instructor')),
    __param(2, (0, mongoose_1.InjectModel)('Admin')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map