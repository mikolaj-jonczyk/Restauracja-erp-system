import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkRepository } from 'src/repositories/work.repository';
import { WorkService } from 'src/services/work.service';
import { CookController } from '../controllers/cook.controller';
import { WorkModule } from './work.module';

@Module({
  imports: [WorkModule, TypeOrmModule.forFeature([WorkRepository])],
  controllers: [CookController],
  providers: [WorkService]
})
export class CookModule {}
