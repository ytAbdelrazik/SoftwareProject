import { Module } from '@nestjs/common';
import { RecommendationEngineController } from './recommendation-engine.controller';
import { RecommendationEngineService } from './recommendation-engine.service';

@Module({
  controllers: [RecommendationEngineController],
  providers: [RecommendationEngineService]
})
export class RecommendationEngineModule {}
