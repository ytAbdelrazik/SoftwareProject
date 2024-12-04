import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
  
  async getAllCourses(): Promise<Course[]> {
    return this.courseModel.find().exec(); // Fetch all courses from the database
  }

 // Update a course with versioning
 async updateCourse(courseId: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
  const course = await this.courseModel.findOne({ courseId });
  if (!course) {
    throw new NotFoundException(`Course with ID ${courseId} not found.`);
  }

  // Save the current course state as a version
  const newVersion = {
    version: `v${course.versions.length + 1}`,
    content: { ...course.toObject() }, // Clone the current state
    updatedAt: new Date(),
  };
  course.versions.push(newVersion);

  // Apply updates
  Object.assign(course, updateCourseDto);
  return course.save();
}

// Revert to a previous version
async revertToVersion(courseId: string, version: string): Promise<Course> {
  try {
    const course = await this.courseModel.findOne({ courseId });
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found.`);
    }

    const versionData = course.versions.find((v) => v.version === version);
    if (!versionData) {
      throw new NotFoundException(`Version ${version} not found for course ${courseId}.`);
    }

    console.log('Reverting to version data:', versionData);

    // Exclude the versions field from the content before restoring
    const restoredContent = { ...versionData.content };
    delete restoredContent.versions;

    // Restore the course with the selected version content
    Object.assign(course, restoredContent);

    // Save the reverted state as a new version
    course.versions.push({
      version: `v${course.versions.length + 1}`,
      content: { ...restoredContent },
      updatedAt: new Date(),
    });

    return course.save();
  } catch (error) {
    console.error('Error in revertToVersion:', error.message);
    throw new InternalServerErrorException(`Failed to revert course version: ${error.message}`);
  }
}




// Get the list of versions for a course
async getVersions(courseId: string): Promise<Array<{ version: string; updatedAt: Date }>> {
  const course = await this.courseModel.findOne({ courseId });
  if (!course) {
    throw new NotFoundException(`Course with ID ${courseId} not found.`);
  }

  return course.versions.map(({ version, updatedAt }) => ({ version, updatedAt }));
}


  // Add a multimedia resource to a course
  async addMultimedia(courseId: string, multimediaUrl: string): Promise<Course> {
    const course = await this.courseModel.findOne({ courseId });
    if (!course) throw new Error('Course not found');

    course.multimedia.push(multimediaUrl);
    return course.save();
  }
}
