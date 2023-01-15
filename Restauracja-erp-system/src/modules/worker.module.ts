import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerController } from 'src/controllers/worker.controller';
import { WorkRepository } from 'src/repositories/work.repository';
import { WorkService } from 'src/services/work.service';
import { WorkModule } from './work.module';

@Module({
  imports: [WorkModule, TypeOrmModule.forFeature([WorkRepository])],
  controllers: [WorkerController],
  providers: [WorkService]
})
export class WorkerModule {}
