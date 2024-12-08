import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './course.schema';
import { CreateCourseDto } from './dots/create-course.dto';
import { UpdateCourseDto } from './dots/update-course.dto';
import { StudentDocument } from './student.schema';
import { InstructorDocument } from './instructor.schema';
import { AddMultimediaDto } from './dots/add-multimedia.dto';

@Injectable()
export class CourseService {
  constructor(
  @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  @InjectModel('Student') private studentModel: Model<StudentDocument>,
  @InjectModel('Instructor') private instructorModel: Model<InstructorDocument>, 
){}

 
  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    // Create a new course document using the provided data.
    const newCourse = await this.courseModel.create(createCourseDto);
    return newCourse; // Return the created course.
  }

 
  async getAllCourses(): Promise<Course[]> {
    // Query the database to fetch all courses.
    return this.courseModel.find().exec();
  }

 
  async updateCourse(courseId: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    // Find the course in the database by its unique courseId.
    const course = await this.courseModel.findOne({ courseId });
    if (!course) {
      // If the course does not exist, throw an error.
      throw new NotFoundException(`Course with ID ${courseId} not found.`);
    }

    // Create a new version snapshot of the current course state.
    const newVersion = {
      version: `v${course.versions.length + 1}`, // Increment the version number.
      content: { ...course.toObject() }, // Clone the current course state.
      updatedAt: new Date(), // Timestamp for the new version.
    };
    course.versions.push(newVersion); // Add the new version to the versions array.

    // Apply the updates from the UpdateCourseDto to the course document.
    Object.assign(course, updateCourseDto);

    // Save the updated course document to the database.
    return course.save();
  }

 
  async revertToVersion(courseId: string, version: string): Promise<Course> {
    try {
      // Find the course by its unique courseId
      const course = await this.courseModel.findOne({ courseId });
      if (!course) {
        throw new NotFoundException(`Course with ID ${courseId} not found.`);
      }
  
      // Find the specific version in the course's versions array
      const versionData = course.versions.find((v) => v.version === version);
      if (!versionData) {
        throw new NotFoundException(`Version ${version} not found for course ${courseId}.`);
      }
  
      console.log('Reverting to version data:', versionData);
  
      // Clone the content of the selected version and exclude the versions field
      const restoredContent = { ...versionData.content };
      delete restoredContent.versions;
  
      // Apply the restored content to the course without creating a new version
      Object.assign(course, restoredContent);
  
      // Save the updated course document to the database
      return course.save();
    } catch (error) {
      console.error('Error in revertToVersion:', error.message);
      throw new InternalServerErrorException(`Failed to revert course version: ${error.message}`);
    }
  }
  
  
  

 
  async getVersions(courseId: string): Promise<Array<{ version: string; updatedAt: Date }>> {
    // Find the course by its unique courseId.
    const course = await this.courseModel.findOne({ courseId });
    if (!course) {
      // If the course does not exist, throw an error.
      throw new NotFoundException(`Course with ID ${courseId} not found.`);
    }

    // Map the versions array to include only version and updatedAt fields.
    return course.versions.map(({ version, updatedAt }) => ({ version, updatedAt }));
  }

 
  
  // Add a multimedia resource to a course
  async addMultimedia(courseId: string, multimediaDto: AddMultimediaDto): Promise<Course> {
    const course = await this.courseModel.findOne({ courseId });
    if (!course) throw new NotFoundException('Course not found');
  
    // Ensure multimedia field is initialized as an array
    if (!Array.isArray(course.multimedia)) {
      course.multimedia = [];
    }
  
    // Check if multimedia with the same URL already exists
    const exists = course.multimedia.some((media) => media.url === multimediaDto.url);
    if (exists) throw new Error('Multimedia resource with this URL already exists.');
  
    // Add the multimedia resource with a default uploadedAt value
    const multimediaWithUploadedAt = {
      ...multimediaDto,
      uploadedAt: multimediaDto.uploadedAt || new Date(), // Assign a default date if not provided
    };
  
    course.multimedia.push(multimediaWithUploadedAt);
    return course.save();
  }
  
  
  
  

  // Remove a multimedia resource from a course
  async removeMultimedia(courseId: string, multimediaId: string): Promise<Course> {
    const course = await this.courseModel.findOne({ courseId });
    if (!course) throw new NotFoundException('Course not found');

    course.multimedia = course.multimedia.filter((media) => media._id.toString() !== multimediaId);
    return course.save();
  }

  // Get all multimedia resources for a course
  async getMultimedia(courseId: string): Promise<Array<{ resourceType: string; url: string; title: string }>> {
    const course = await this.courseModel.findOne({ courseId });
    if (!course) throw new NotFoundException('Course not found');

    return course.multimedia;
  }

   

async searchCourses(query: string, limit = 10, skip = 0): Promise<Course[]> {
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



async searchStudents(query: string, limit = 10, skip = 0): Promise<any[]> {
  return this.studentModel
    .find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { id: { $regex: query, $options: 'i' } },
      ],
    })
    .limit(limit)
    .skip(skip)
    .exec();
}

async searchInstructors(query: string, limit = 10, skip = 0): Promise<any[]> {
  return this.instructorModel
    .find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { id: { $regex: query, $options: 'i' } },
      ],
    })
    .limit(limit)
    .skip(skip)
    .exec();
}

}
