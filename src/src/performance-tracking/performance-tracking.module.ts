import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PerformanceTrackingController } from './performance-tracking.controller';
import { PerformanceTrackingService } from './performance-tracking.service';
import { Progress, ProgressSchema } from './progress.schema';

@Module({
    imports: [
      // MongoDB connection string without the deprecated options

      MongooseModule.forFeature([{ name: Progress.name, schema: ProgressSchema }]),
    ],
    controllers: [PerformanceTrackingController],
    providers: [PerformanceTrackingService],
  })
  export class PerformanceTrackingModule {}