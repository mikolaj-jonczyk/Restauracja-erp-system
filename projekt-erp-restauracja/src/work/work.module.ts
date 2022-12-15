import { Module } from '@nestjs/common';
import { HelpersModule } from '../helpers/helpers.module';
import { WorkController } from './work.controller';
import { WorkMapper } from './work.mapper';
import { WorkService } from './work.service';

@Module({
  controllers: [WorkController],
  providers: [WorkService, WorkMapper],
  imports: [HelpersModule]
})
export class WorkModule {}

