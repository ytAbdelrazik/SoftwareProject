import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';
import { Module as CourseModule, ModuleSchema } from './module.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CourseModule.name, schema: ModuleSchema }]),
  ],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}
