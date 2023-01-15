import {
  Body,
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
import { Response } from 'express';
import { WorkService } from 'src/services/work.service';
import { UpdateTaskStatusDto } from 'src/models/tasks/dto/update-task-status.dto';
import { ProductService } from 'src/services/product.service';
import { CrateTaskDto } from 'src/models/tasks/dto/create-task.dto';
import { Log } from 'src/log';

@Controller('chef')
export class ChefController {
  constructor(
    private workService: WorkService,
    private productService: ProductService
  ) {}

  @Get()
  @Render('chef/panel')
  aptPanel() {
    this.validateUser();
    return;
  }

  @Get('allProducts')
  @Render('chef/allProducts')
  async allProducts(@Query() filterDto: GetTasksFilterDto) {
    this.validateUser();
    const products = await this.productService.getProducts(filterDto);
    return { products };
  }

  // @Post('/singleProduct/:id/status')
  // async updatePrescriptionStatus(
  //   @Param('id') id: string,
  //   @Res() res: Response
  // ) {
  //   await this.prescriptionsService.updateTaskStatus(id);
  //   return res.redirect(`http://localhost:3000/apt/allPrescriptions`);
  // }

  @Get('/singleProduct/:id')
  async singlePrescription(@Param('id') id, @Res() res: Response) {
    this.validateUser();
    const single = await this.productService.getProductById(id);
    return res.render('chef/singleProduct', { single });
  }

  @Post('/singleProduct/deleteProduct/:id')
  async deleteProductById(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<void> {
    this.validateUser();
    await this.productService.deleteProduct(id);
    return res.redirect('http://localhost:3000/chef');
  }

  @Get('createTask')
  @Render('chef/createTask')
  async createTask() {
    this.validateUser();
    return;
  }

  @Post('createTask')
  async createTaskPost(
    @Body() createTaskDto: CrateTaskDto,
    @Res() res: Response
  ) {
    this.validateUser();
    const single = await this.workService.createTask(createTaskDto);
    return res.redirect(`singleTask/${single.id}`);
  }

  @Get('allTasks')
  @Render('chef/allTasks')
  async allTasks(@Query() filterDto: GetTasksFilterDto) {
    this.validateUser();
    const tasks = await this.workService.getTasks(filterDto);
    return { tasks };
  }

  @Get('/singleTask/:id')
  async singleTask(@Param('id') id, @Res() res: Response) {
    this.validateUser();
    const single = await this.workService.getTaskById(id);
    return res.render('chef/singleTask', { single });
  }

  @Post('/singleTask/deleteTask/:id')
  async deleteTaskById(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<void> {
    this.validateUser();
    await this.workService.deleteTask(id);
    return res.redirect('http://localhost:3000/chef');
  }

  validateUser() {
    console.log(Log);
    if (Log.logged) {
      if (Log.role !== 'chef') {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      } else {
        return;
      }
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
