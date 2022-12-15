import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskDto, TaskDto, ChangeStatusDto } from './dtos/index';
import { Task } from './models/task.model';
import { WorkService } from './work.service';

@Controller('work')
export class WorkController {
  constructor(private workService: WorkService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.workService.getAll();
  }

  @Post()
  addTask(@Body() createProduct: CreateTaskDto): TaskDto {
    return this.workService.add(createProduct);
  }

  @Patch(':id/status/:status')
  changeTaskStatus(@Param() changeStatusDto: ChangeStatusDto): TaskDto {
    return this.workService.changeStatus(changeStatusDto);
  }
}
