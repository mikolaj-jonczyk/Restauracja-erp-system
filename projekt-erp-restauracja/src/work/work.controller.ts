import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './models/task.model';
import { WorkService } from './work.service';

@Controller('work')
export class WorkController {
  constructor(private workService: WorkService) {}

  @Get()
  getAllPorducts(): Task[] {
    return this.workService.getAll();
  }

  @Post()
  addProduct(@Body() createProduct: Task): void {
    return this.workService.add(createProduct);
  }
}
