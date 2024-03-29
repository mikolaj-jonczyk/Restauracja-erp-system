import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { WorkService } from '../services/work.service';
import { CrateTaskDto } from '../models/tasks/dto/create-task.dto';
import { GetTasksFilterDto } from '../models/tasks/dto/get-tasks-filter.dto';
import { Work } from '../models/tasks/work.entity';

@Controller('work')
export class WorkController {
  constructor(private workService: WorkService) {}

  @Get()
  getPrescriptions(@Query() filterDto: GetTasksFilterDto): Promise<Work[]> {
    return this.workService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Work> {
    return this.workService.getTaskById(id);
  }

  @Delete('/:id')
  deletePrescriptionById(@Param('id') id: string): Promise<void> {
    return this.workService.deleteTask(id);
  }

  @Post()
  createPrescription(
    @Body() createPrescriptionDto: CrateTaskDto
  ): Promise<Work> {
    return this.workService.createTask(createPrescriptionDto);
  }

  @Patch('/:id/status')
  updatePrescriptionStatus(@Param('id') id: string): Promise<Work> {
    return this.workService.updateTaskStatus(id);
  }
}
