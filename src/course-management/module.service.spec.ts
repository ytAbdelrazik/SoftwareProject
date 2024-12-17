import { Test, TestingModule } from '@nestjs/testing';
import { ModuleService } from './module.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Module as CourseModule } from './module.schema';

describe('ModuleService', () => {
  let service: ModuleService;
  let model: Model<CourseModule>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModuleService,
        {
          provide: getModelToken(CourseModule.name),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ModuleService>(ModuleService);
    model = module.get<Model<CourseModule>>(getModelToken(CourseModule.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
