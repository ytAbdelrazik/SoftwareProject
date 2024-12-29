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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_2 = require("@nestjs/common");
const course_schema_1 = require("./course.schema");
const user_service_1 = require("../user-managment/user.service");
const common_3 = require("@nestjs/common");
let CourseService = class CourseService {
    constructor(courseModel, studentModel, instructorModel, userService) {
        this.courseModel = courseModel;
        this.studentModel = studentModel;
        this.instructorModel = instructorModel;
        this.userService = userService;
    }
    async createCourse(createCourseDto, instructorId) {
        try {
            const newCourse = await this.courseModel.create(createCourseDto);
            const instructor = await this.userService.getUserById(instructorId);
            if (instructor.role === 'instructor') {
                const instructorTyped = instructor;
                instructorTyped.createdCourses = [...instructorTyped.createdCourses, newCourse];
            }
            else {
                throw new Error('User is not an instructor');
            }
            return newCourse;
        }
        catch (error) {
            throw new Error(`Error creating course: ${error.message}`);
        }
    }
    async updateINS(courseId, instructorId) {
        try {
            const courseExists = await this.courseModel.exists({ courseId });
            if (!courseExists) {
                throw new Error(`Course with ID ${courseId} does not exist`);
            }
            const course = await this.getCourseById(courseId);
            if (!course) {
                throw new Error(`Course with ID ${courseId} not found`);
            }
            const instructor = await this.userService.getUserById(instructorId);
            if (!instructor) {
                throw new Error(`Instructor with ID ${instructorId} not found`);
            }
            if (instructor.role !== 'instructor') {
                throw new Error(`User with ID ${instructorId} is not an instructor.`);
            }
            const instructorTyped = instructor;
            const isCourseAlreadyAdded = instructorTyped.createdCourses.some((createdCourse) => createdCourse.courseId === courseId);
            if (!isCourseAlreadyAdded) {
                await this.instructorModel.updateOne({ userId: instructorId }, { $push: { createdCourses: course } });
                console.log(`Course with ID ${courseId} successfully added to instructor's createdCourses.`);
            }
            else {
                console.log(`Course with ID ${courseId} is already in instructor's createdCourses.`);
            }
        }
        catch (error) {
            console.error('Error in updateINS:', error.message);
            throw error;
        }
    }
    async getAllCourses() {
        return this.courseModel.find().exec();
    }
    async updateCourse(courseId, updateCourseDto) {
        const course = await this.courseModel.findOne({ courseId });
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${courseId} not found.`);
        }
        const newVersion = {
            version: `v${course.versions.length + 1}`,
            content: { ...course.toObject() },
            updatedAt: new Date(),
        };
        course.versions.push(newVersion);
        Object.assign(course, updateCourseDto);
        return course.save();
    }
    async revertToVersion(courseId, version) {
        try {
            const course = await this.courseModel.findOne({ courseId });
            if (!course) {
                throw new common_1.NotFoundException(`Course with ID ${courseId} not found.`);
            }
            const versionData = course.versions.find((v) => v.version === version);
            if (!versionData) {
                throw new common_1.NotFoundException(`Version ${version} not found for course ${courseId}.`);
            }
            console.log('Reverting to version data:', versionData);
            const restoredContent = { ...versionData.content };
            delete restoredContent.versions;
            Object.assign(course, restoredContent);
            return course.save();
        }
        catch (error) {
            console.error('Error in revertToVersion:', error.message);
            throw new common_1.InternalServerErrorException(`Failed to revert course version: ${error.message}`);
        }
    }
    async getVersions(courseId) {
        const course = await this.courseModel.findOne({ courseId });
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${courseId} not found.`);
        }
        return course.versions.map(({ version, updatedAt }) => ({ version, updatedAt }));
    }
    async addMultimedia(courseId, multimediaDto) {
        const course = await this.courseModel.findOne({ courseId });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        if (!Array.isArray(course.multimedia)) {
            course.multimedia = [];
        }
        const exists = course.multimedia.some((media) => media.url === multimediaDto.url);
        if (exists)
            throw new Error('Multimedia resource with this URL already exists.');
        const multimediaWithUploadedAt = {
            ...multimediaDto,
            uploadedAt: multimediaDto.uploadedAt || new Date(),
        };
        course.multimedia.push(multimediaWithUploadedAt);
        return course.save();
    }
    async getStudentEnrolledCourses(studentId) {
        const student = await this.studentModel.findOne({ userId: studentId }).exec();
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${studentId} not found`);
        }
        console.log('Enrolled Courses:', student.enrolledCourses);
        const enrolledCourses = await this.courseModel
            .find({
            courseId: { $in: student.enrolledCourses },
        })
            .exec();
        console.log('Fetched Enrolled Courses:', enrolledCourses);
        return enrolledCourses;
    }
    async getCourseById(courseId) {
        try {
            const course = await this.courseModel.findOne({ courseId }).exec();
            if (!course) {
                throw new common_1.NotFoundException(`Course with ID ${courseId} not found`);
            }
            return course;
        }
        catch (error) {
            console.error('Error retrieving course:', error.message);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error retrieving course');
        }
    }
    async courseExists(courseId) {
        try {
            const course = await this.courseModel.findOne({ courseId });
            return course !== null;
        }
        catch (error) {
            console.error('Error checking if course exists:', error);
            return false;
        }
    }
    async removeMultimedia(courseId, multimediaId) {
        const course = await this.courseModel.findOne({ courseId });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        course.multimedia = course.multimedia.filter((media) => media._id.toString() !== multimediaId);
        return course.save();
    }
    async getMultimedia(courseId) {
        const course = await this.courseModel.findOne({ courseId });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        return course.multimedia;
    }
    async searchCourses(query, limit = 10, skip = 0) {
        return this.courseModel
            .find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } },
                { createdBy: { $regex: query, $options: 'i' } },
            ],
        })
            .limit(limit)
            .skip(skip)
            .exec();
    }
    async getAllEnrolledCourses(userId) {
        const student = await this.studentModel.findOne({ userId }).exec();
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${userId} not found`);
        }
        const enrolledCourses = await this.courseModel
            .find({
            courseId: { $in: student.enrolledCourses },
        })
            .exec();
        return enrolledCourses;
    }
    async searchInstructors(query, limit = 10, skip = 0) {
        return this.instructorModel
            .find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { userId: { $regex: query, $options: 'i' } },
            ],
        })
            .limit(limit)
            .skip(skip)
            .exec();
    }
    async getCoursesOrderedByDate(order) {
        return this.courseModel.find().sort({ createdAt: order === 'asc' ? 1 : -1 }).exec();
    }
    async getCompletedCourses(studentId) {
        const student = await this.studentModel.findOne({ userId: studentId }).exec();
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID '${studentId}' not found.`);
        }
        const completedCourseDetails = await Promise.all(student.completedCourses.map(async (completedCourse) => {
            const course = await this.courseModel.findOne({ courseId: completedCourse.courseId }).exec();
            return {
                ...course.toObject(),
                completionDate: completedCourse.completionDate,
                score: completedCourse.score,
            };
        }));
        return completedCourseDetails;
    }
    async getStudentsWhoCompletedCourse(instructorId, courseId) {
        const course = await this.courseModel.findOne({ courseId, createdBy: instructorId }).exec();
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID '${courseId}' not found or you are not the creator.`);
        }
        const students = await this.studentModel
            .find({ 'completedCourses.courseId': courseId }, { name: 1, email: 1, 'completedCourses.$': 1 })
            .exec();
        if (!students || students.length === 0) {
            throw new common_1.NotFoundException(`No students have completed the course with ID '${courseId}'.`);
        }
        return students.map((student) => ({
            name: student.name,
            email: student.email,
            completionDate: student.completedCourses[0].completionDate,
            score: student.completedCourses[0].score,
        }));
    }
    async addKeywordsToCourse(courseId, keywords, instructorId) {
        const course = await this.courseModel.findOne({ courseId }).exec();
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID '${courseId}' not found`);
        }
        if (course.createdBy !== instructorId) {
            throw new common_1.UnauthorizedException('You are not authorized to add keywords to this course');
        }
        course.keywords = Array.from(new Set([...(course.keywords || []), ...keywords]));
        return await course.save();
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __param(1, (0, mongoose_1.InjectModel)('Student')),
    __param(2, (0, mongoose_1.InjectModel)('Instructor')),
    __param(3, (0, common_3.Inject)((0, common_2.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        user_service_1.UserService])
], CourseService);
//# sourceMappingURL=course.service.js.map