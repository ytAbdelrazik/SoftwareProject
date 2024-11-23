import { Module } from '@nestjs/common';
import { PerformanceTrackingController } from './performance-tracking.controller';
import { PerformanceTrackingService } from './performance-tracking.service';

@Module({
  controllers: [PerformanceTrackingController],
  providers: [PerformanceTrackingService]
})
export class PerformanceTrackingModule {}
