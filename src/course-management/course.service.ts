import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './course.schema';
import { CreateCourseDto } from './dots/create-course.dto';
import { UpdateCourseDto } from './dots/update-course.dto';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  /**
   * Creates a new course in the database.
   * @param {CreateCourseDto} createCourseDto - The data transfer object containing course details.
   * @returns {Promise<Course>} - The newly created course.
   * @throws {InternalServerErrorException} - If course creation fails.
   */
  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    // Create a new course document using the provided data.
    const newCourse = await this.courseModel.create(createCourseDto);
    return newCourse; // Return the created course.
  }

  /**
   * Retrieves all courses from the database.
   * @returns {Promise<Course[]>} - An array of all courses.
   */
  async getAllCourses(): Promise<Course[]> {
    // Query the database to fetch all courses.
    return this.courseModel.find().exec();
  }

  /**
   * Updates a course and saves the current state as a new version.
   * @param {string} courseId - The unique ID of the course to update.
   * @param {UpdateCourseDto} updateCourseDto - The data transfer object containing the updated course details.
   * @returns {Promise<Course>} - The updated course.
   * @throws {NotFoundException} - If the course is not found.
   */
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

  /**
   * Reverts a course to a previous version and saves the reverted state as a new version.
   * @param {string} courseId - The unique ID of the course to revert.
   * @param {string} version - The version identifier to revert to.
   * @returns {Promise<Course>} - The course reverted to the specified version.
   * @throws {NotFoundException} - If the course or version is not found.
   * @throws {InternalServerErrorException} - If reverting fails.
   */
  async revertToVersion(courseId: string, version: string): Promise<Course> {
    try {
      // Find the course by its unique courseId.
      const course = await this.courseModel.findOne({ courseId });
      if (!course) {
        // If the course does not exist, throw an error.
        throw new NotFoundException(`Course with ID ${courseId} not found.`);
      }

      // Find the specific version in the course's versions array.
      const versionData = course.versions.find((v) => v.version === version);
      if (!versionData) {
        // If the version does not exist, throw an error.
        throw new NotFoundException(`Version ${version} not found for course ${courseId}.`);
      }

      console.log('Reverting to version data:', versionData);

      // Clone the content of the selected version and exclude the versions field.
      const restoredContent = { ...versionData.content };
      delete restoredContent.versions;

      // Overwrite the current course with the restored content.
      Object.assign(course, restoredContent);

      // Save the restored state as a new version.
      course.versions.push({
        version: `v${course.versions.length + 1}`, // Increment the version number.
        content: { ...restoredContent }, // Save the restored state.
        updatedAt: new Date(), // Timestamp for the new version.
      });

      // Save the updated course document to the database.
      return course.save();
    } catch (error) {
      // Log the error and throw a generic internal server error.
      console.error('Error in revertToVersion:', error.message);
      throw new InternalServerErrorException(`Failed to revert course version: ${error.message}`);
    }
  }

  /**
   * Retrieves the list of versions for a specific course.
   * @param {string} courseId - The unique ID of the course.
   * @returns {Promise<Array<{ version: string; updatedAt: Date }>>} - An array of version metadata.
   * @throws {NotFoundException} - If the course is not found.
   */
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

  /**
   * Adds a multimedia resource to a specific course.
   * @param {string} courseId - The unique ID of the course.
   * @param {string} multimediaUrl - The URL of the multimedia resource to add.
   * @returns {Promise<Course>} - The updated course with the added multimedia.
   * @throws {Error} - If the course is not found.
   */
  async addMultimedia(courseId: string, multimediaUrl: string): Promise<Course> {
    // Find the course by its unique courseId.
    const course = await this.courseModel.findOne({ courseId });
    if (!course) {
      // If the course does not exist, throw an error.
      throw new Error('Course not found');
    }

    // Add the multimedia URL to the course's multimedia array.
    course.multimedia.push(multimediaUrl);

    // Save the updated course document to the database.
    return course.save();
  }
}
