import { Module } from '@nestjs/common';
import { InteractiveModulesController } from './interactive-modules.controller';
import { InteractiveModulesService } from './interactive-modules.service';

@Module({
  controllers: [InteractiveModulesController],
  providers: [InteractiveModulesService]
})
export class InteractiveModulesModule {}
