import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PerformanceTrackingController } from './progresstracking.controller';
import { PerformanceTrackingService } from './progresstracking.service';
import { Progress, ProgressSchema } from './progresschema';

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