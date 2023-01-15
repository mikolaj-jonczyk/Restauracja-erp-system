import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Render,
  Res
} from '@nestjs/common';
import { GetTasksFilterDto } from 'src/models/tasks/dto/get-tasks-filter.dto';
import { WorkService } from 'src/services/work.service';
import { Response } from 'express';
import { Log } from 'src/log';

@Controller('worker')
export class WorkerController {
  constructor(private workService: WorkService) {}

  @Get()
  @Render('worker/panel')
  workerPanel() {
    this.validateUser();
    return;
  }

  @Post('/singleTask/deleteTask/:id')
  async deleteTaskById(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<void> {
    this.validateUser();
    await this.workService.deleteTask(id);
    return res.redirect('http://localhost:3000/worker');
  }
  @Get('allTasks')
  @Render('worker/allTasks')
  async allTasks(@Query() filterDto: GetTasksFilterDto) {
    this.validateUser();
    const tasks = await this.workService.getTasks(filterDto);
    return { tasks };
  }

  @Get('/singleTask/:id')
  async singleTask(@Param('id') id, @Res() res: Response) {
    this.validateUser();
    const single = await this.workService.getTaskById(id);
    return res.render('worker/singleTask', { single });
  }

  validateUser() {
    if (Log.logged) {
      if (Log.role !== 'worker') {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      } else {
        return;
      }
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
