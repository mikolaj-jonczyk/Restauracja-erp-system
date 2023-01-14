import {
  Body,
  Controller,
  Get,
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
    return;
  }

  @Get('allTasks')
  @Render('boss/allTasks')
  async allTasks(@Query() filterDto: GetTasksFilterDto) {
    const tasks = await this.workService.getTasks(filterDto);
    return { tasks };
  }

  @Get('allProducts')
  @Render('boss/allProducts')
  async allProducts(@Query() filterDto: GetProductsDto) {
    const products = await this.productService.getProducts(filterDto);
    return { products };
  }

  @Get('allDelivery')
  @Render('boss/allDelivery')
  async allDelivery(@Query() filterDto: GetDeliveryDto) {
    const delivery = await this.deliveryService.getDelivery(filterDto);
    return { delivery };
  }

  @Get('createTask')
  @Render('boss/createTask')
  async createTask() {
    return;
  }

  @Get('createProduct')
  @Render('boss/createProduct')
  async createProduct() {
    return;
  }

  @Get('createDelivery')
  @Render('boss/createDelivery')
  async createDelivery() {
    return;
  }

  @Post('createTask')
  async createTaskPost(
    @Body() createTaskDto: CrateTaskDto,
    @Res() res: Response
  ) {
    const single = await this.workService.createTask(createTaskDto);
    return res.redirect(`singleTask/${single.id}`);
  }

  @Post('createProduct')
  async createProductPost(
    @Body() createProductDto: CrateProductDto,
    @Res() res: Response
  ) {
    const single = await this.productService.createProduct(createProductDto);
    return res.redirect(`singleProduct/${single.id}`);
  }

  @Post('createDelivery')
  async createDeliveryPost(
    @Body() createDeliveryDto: CrateDeliveryDto,
    @Res() res: Response
  ) {
    console.log(createDeliveryDto);
    const single = await this.deliveryService.createDelivery(createDeliveryDto);
    return res.redirect(`singleDelivery/${single.id}`);
  }

  @Post('/singleTask/deleteTask/:id')
  async deleteTaskById(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<void> {
    await this.workService.deleteTask(id);
    return res.redirect('http://localhost:3000/boss');
  }

  @Post('/singleProduct/deleteProduct/:id')
  async deleteProductById(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<void> {
    await this.productService.deleteProduct(id);
    return res.redirect('http://localhost:3000/boss');
  }

  @Post('/singleDelivery/deleteDelivery/:id')
  async deleteDeliveryById(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<void> {
    await this.deliveryService.deleteDelivery(id);
    return res.redirect('http://localhost:3000/boss');
  }

  @Get('/singleTask/:id')
  async singleTask(@Param('id') id, @Res() res: Response) {
    const single = await this.workService.getTaskById(id);
    return res.render('boss/singleTask', { single });
  }

  @Get('/singleProduct/:id')
  async singleProduct(@Param('id') id, @Res() res: Response) {
    const single = await this.productService.getProductById(id);
    return res.render('boss/singleProduct', { single });
  }

  @Get('/singleDelivery/:id')
  async singleDelivery(@Param('id') id, @Res() res: Response) {
    const single = await this.deliveryService.getDeliveryById(id);
    return res.render('boss/singleDelivery', { single });
  }
}
