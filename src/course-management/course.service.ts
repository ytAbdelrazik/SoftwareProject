import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './course.schema';
import { CreateCourseDto } from './dots/create-course.dto';
import { UpdateCourseDto } from './dots/update-course.dto';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  // Create a new course
  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    const newCourse = await this.courseModel.create(createCourseDto);
    return newCourse;
  }
  

  // Update an existing course
  async updateCourse(courseId: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    return this.courseModel.findOneAndUpdate({ courseId }, updateCourseDto, { new: true });
  }

  // Add a multimedia resource to a course
  async addMultimedia(courseId: string, multimediaUrl: string): Promise<Course> {
    const course = await this.courseModel.findOne({ courseId });
    if (!course) throw new Error('Course not found');

    course.multimedia.push(multimediaUrl);
    return course.save();
  }
}
