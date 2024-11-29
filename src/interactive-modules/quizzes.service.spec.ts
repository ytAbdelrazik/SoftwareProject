import { Test, TestingModule } from '@nestjs/testing';
import { InteractiveModulesService } from './quizzes.service';

describe('InteractiveModulesService', () => {
  let service: InteractiveModulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InteractiveModulesService],
    }).compile();

    service = module.get<InteractiveModulesService>(InteractiveModulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
