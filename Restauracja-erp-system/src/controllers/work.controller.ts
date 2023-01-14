import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { WorkService } from '../services/work.service';
import { CrateTaskDto } from '../models/tasks/dto/create-task.dto';
import { GetTasksFilterDto } from '../models/tasks/dto/get-tasks-filter.dto';
import { Work } from '../models/tasks/work.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('work')
@UseGuards(AuthGuard())
export class WorkController {
  constructor(private prescriptionsService: WorkService) {}

  @Get()
  getPrescriptions(@Query() filterDto: GetTasksFilterDto): Promise<Work[]> {
    return this.prescriptionsService.getTasks(filterDto);
  }

  @Get('/:id')
  getPrescriptionById(@Param('id') id: string): Promise<Work> {
    return this.prescriptionsService.getTaskById(id);
  }

  @Delete('/:id')
  deletePrescriptionById(@Param('id') id: string): Promise<void> {
    return this.prescriptionsService.deleteTask(id);
  }

  @Post()
  createPrescription(
    @Body() createPrescriptionDto: CrateTaskDto
  ): Promise<Work> {
    return this.prescriptionsService.createTask(createPrescriptionDto);
  }

  @Patch('/:id/status')
  updatePrescriptionStatus(@Param('id') id: string): Promise<Work> {
    return this.prescriptionsService.updateTaskStatus(id);
  }
}
