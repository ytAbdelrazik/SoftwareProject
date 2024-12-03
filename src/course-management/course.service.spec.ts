import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './course.schema';

describe('CourseService', () => {
  let service: CourseService;
  let model: Model<Course>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: getModelToken(Course.name),
          useValue: {
            create: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    model = module.get<Model<Course>>(getModelToken(Course.name));
  });

  it('should create a course', async () => {
    jest.spyOn(model, 'create').mockResolvedValue({
      courseId: 'CS101',
      difficultyLevel: 'Beginner',
    } as any);
    const result = await service.createCourse({
      courseId: 'CS101',
      title: 'Introduction to CS',
      description: 'Basics of CS',
      category: 'CS',
      createdBy: 'Instructor123',
      multimedia: [],
      difficultyLevel: 'Beginner', // Added difficultyLevel
    });
    expect(result.courseId).toBe('CS101');
    expect(result.difficultyLevel).toBe('Beginner');
  });

  it('should update a course', async () => {
    jest.spyOn(model, 'findOneAndUpdate').mockResolvedValue({
      title: 'Advanced CS',
      difficultyLevel: 'Advanced',
    } as any);
    const result = await service.updateCourse('CS101', {
      title: 'Advanced CS',
      difficultyLevel: 'Advanced',
    });
    expect(result.title).toBe('Advanced CS');
    expect(result.difficultyLevel).toBe('Advanced');
  });

  it('should add multimedia', async () => {
    const mockCourse = { multimedia: [], save: jest.fn() };
    jest.spyOn(model, 'findOne').mockResolvedValue(mockCourse as any);
    const result = await service.addMultimedia('CS101', 'http://example.com/video.mp4');
    expect(mockCourse.multimedia).toContain('http://example.com/video.mp4');
  });
});
