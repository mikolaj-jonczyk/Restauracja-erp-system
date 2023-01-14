import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth.module';
import { WorkRepository } from '../repositories/work.repository';
import { WorkController } from '../controllers/work.controller';
import { WorkService } from '../services/work.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([WorkRepository])],
  controllers: [WorkController],
  providers: [WorkService]
})
export class WorkModule {}
