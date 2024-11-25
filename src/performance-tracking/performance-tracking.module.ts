import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PerformanceTrackingController } from './performance-tracking.controller';
import { PerformanceTrackingService } from './performance-tracking.service';
import { Progress, ProgressSchema } from './progres.schema';

@Module({
    imports: [
      // MongoDB connection string without the deprecated options
      MongooseModule.forRoot('mongodb+srv://hamza:fo2sheldoksh@cluster0.l8ikh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
      MongooseModule.forFeature([{ name: Progress.name, schema: ProgressSchema }]),
    ],
    controllers: [PerformanceTrackingController],
    providers: [PerformanceTrackingService],
  })
  export class PerformanceTrackingModule {}