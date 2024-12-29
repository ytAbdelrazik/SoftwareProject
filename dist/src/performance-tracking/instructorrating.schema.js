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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorRatingSchema = exports.InstructorRating = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let InstructorRating = class InstructorRating extends mongoose_2.Document {
};
exports.InstructorRating = InstructorRating;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, ref: 'User' }),
    __metadata("design:type", String)
], InstructorRating.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, ref: 'Instructor' }),
    __metadata("design:type", String)
], InstructorRating.prototype, "instructorId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, ref: 'Course' }),
    __metadata("design:type", String)
], InstructorRating.prototype, "courseId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, min: 1, max: 5 }),
    __metadata("design:type", Number)
], InstructorRating.prototype, "rating", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], InstructorRating.prototype, "createdAt", void 0);
exports.InstructorRating = InstructorRating = __decorate([
    (0, mongoose_1.Schema)()
], InstructorRating);
exports.InstructorRatingSchema = mongoose_1.SchemaFactory.createForClass(InstructorRating);
//# sourceMappingURL=instructorrating.schema.js.map