import { Test, TestingModule } from '@nestjs/testing';
import { CourseManagementController } from './course-management.controller';

describe('CourseManagementController', () => {
  let controller: CourseManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseManagementController],
    }).compile();

    controller = module.get<CourseManagementController>(CourseManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
