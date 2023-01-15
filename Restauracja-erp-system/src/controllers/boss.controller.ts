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
import { CrateTaskDto } from 'src/models/tasks/dto/create-task.dto';
import { GetTasksFilterDto } from 'src/models/tasks/dto/get-tasks-filter.dto';
import { Response } from 'express';
import { WorkService } from 'src/services/work.service';
import { ProductService } from 'src/services/product.service';
import { DeliveryService } from 'src/services/delivery.service';
import { GetProductsDto } from 'src/models/products/dto/get-products.dto';
import { GetDeliveryDto } from 'src/models/delivery/dto/get-delivery.dto';
import { CrateProductDto } from 'src/models/products/dto/create-product.dto';
import { CrateDeliveryDto } from 'src/models/delivery/dto/create-delivery.dto';
import { Log } from 'src/log';

@Controller('boss')
export class BossController {
  constructor(
    private workService: WorkService,
    private productService: ProductService,
    private deliveryService: DeliveryService
  ) {}

  @Get()
  @Render('boss/panel')
  bossPanel() {
    this.validateUser();
    return;
  }

  @Get('allTasks')
  @Render('boss/allTasks')
  async allTasks(@Query() filterDto: GetTasksFilterDto) {
    this.validateUser();
    const tasks = await this.workService.getTasks(filterDto);
    return { tasks };
  }

  @Get('allProducts')
  @Render('boss/allProducts')
  async allProducts(@Query() filterDto: GetProductsDto) {
    this.validateUser();
    const products = await this.productService.getProducts(filterDto);
    return { products };
  }

  @Get('allDelivery')
  @Render('boss/allDelivery')
  async allDelivery(@Query() filterDto: GetDeliveryDto) {
    this.validateUser();
    const delivery = await this.deliveryService.getDelivery(filterDto);
    return { delivery };
  }

  @Get('createTask')
  @Render('boss/createTask')
  async createTask() {
    this.validateUser();
    return;
  }

  @Get('createProduct')
  @Render('boss/createProduct')
  async createProduct() {
    this.validateUser();
    return;
  }

  @Get('createDelivery')
  @Render('boss/createDelivery')
  async createDelivery() {
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

  @Post('createProduct')
  async createProductPost(
    @Body() createProductDto: CrateProductDto,
    @Res() res: Response
  ) {
    this.validateUser();
    const single = await this.productService.createProduct(createProductDto);
    return res.redirect(`singleProduct/${single.id}`);
  }

  @Post('createDelivery')
  async createDeliveryPost(
    @Body() createDeliveryDto: CrateDeliveryDto,
    @Res() res: Response
  ) {
    this.validateUser();
    const single = await this.deliveryService.createDelivery(createDeliveryDto);
    return res.redirect(`singleDelivery/${single.id}`);
  }

  @Post('/singleTask/deleteTask/:id')
  async deleteTaskById(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<void> {
    this.validateUser();
    await this.workService.deleteTask(id);
    return res.redirect('http://localhost:3000/boss');
  }

  @Post('/singleProduct/deleteProduct/:id')
  async deleteProductById(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<void> {
    this.validateUser();
    await this.productService.deleteProduct(id);
    return res.redirect('http://localhost:3000/boss');
  }

  @Post('/singleDelivery/deleteDelivery/:id')
  async deleteDeliveryById(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<void> {
    this.validateUser();
    await this.deliveryService.deleteDelivery(id);
    return res.redirect('http://localhost:3000/boss');
  }

  @Get('/singleTask/:id')
  async singleTask(@Param('id') id, @Res() res: Response) {
    this.validateUser();
    const single = await this.workService.getTaskById(id);
    return res.render('boss/singleTask', { single });
  }

  @Get('/singleProduct/:id')
  async singleProduct(@Param('id') id, @Res() res: Response) {
    this.validateUser();
    const single = await this.productService.getProductById(id);
    return res.render('boss/singleProduct', { single });
  }

  @Get('/singleDelivery/:id')
  async singleDelivery(@Param('id') id, @Res() res: Response) {
    this.validateUser();
    const single = await this.deliveryService.getDeliveryById(id);
    return res.render('boss/singleDelivery', { single });
  }

  validateUser() {
    if (Log.logged) {
      if (Log.role !== 'boss') {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      } else {
        return;
      }
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
