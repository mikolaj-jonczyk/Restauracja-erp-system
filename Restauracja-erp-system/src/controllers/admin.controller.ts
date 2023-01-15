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
import { AuthService } from 'src/services/auth.service';
import { Response } from 'express';
import { WorkService } from 'src/services/work.service';
import { AuthCredentialsDto } from 'src/models/auth/dto/auth.credentials.dto';
import { DeliveryService } from 'src/services/delivery.service';
import { ProductService } from 'src/services/product.service';
import { GetProductsDto } from 'src/models/products/dto/get-products.dto';
import { CrateProductDto } from 'src/models/products/dto/create-product.dto';
import { GetDeliveryDto } from 'src/models/delivery/dto/get-delivery.dto';
import { CrateDeliveryDto } from 'src/models/delivery/dto/create-delivery.dto';
import { Log } from 'src/log';

@Controller('admin')
export class AdminController {
  constructor(
    private workService: WorkService,
    private authService: AuthService,
    private deliveryService: DeliveryService,
    private productService: ProductService
  ) {}

  @Get()
  @Render('admin/panel')
  adminPanel() {
    this.validateUser();
    return;
  }

  @Get('allTasks')
  @Render('admin/allTasks')
  async allTasks(@Query() filterDto: GetTasksFilterDto) {
    this.validateUser();
    const tasks = await this.workService.getTasks(filterDto);
    return { tasks };
  }

  @Get('allProducts')
  @Render('admin/allProducts')
  async allProducts(@Query() filterDto: GetProductsDto) {
    this.validateUser();
    const products = await this.productService.getProducts(filterDto);
    return { products };
  }

  @Get('allDelivery')
  @Render('admin/allDelivery')
  async allDelivery(@Query() filterDto: GetDeliveryDto) {
    this.validateUser();
    const delivery = await this.deliveryService.getDelivery(filterDto);
    return { delivery };
  }

  @Get('allUsers')
  @Render('admin/allUsers')
  async allUsers() {
    this.validateUser();
    const users = await this.authService.listUsers();
    return { users };
  }

  @Get('createTask')
  @Render('admin/createTask')
  async createTask() {
    this.validateUser();
    return;
  }

  @Get('createProduct')
  @Render('admin/createProduct')
  async createProduct() {
    this.validateUser();
    return;
  }

  @Get('createDelivery')
  @Render('admin/createDelivery')
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
    return res.redirect('http://localhost:3000/admin');
  }

  @Post('/singleProduct/deleteProduct/:id')
  async deleteProductById(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<void> {
    this.validateUser();
    await this.productService.deleteProduct(id);
    return res.redirect('http://localhost:3000/admin');
  }

  @Post('/singleDelivery/deleteDelivery/:id')
  async deleteDeliveryById(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<void> {
    this.validateUser();
    await this.deliveryService.deleteDelivery(id);
    return res.redirect('http://localhost:3000/admin');
  }

  @Get('/singleTask/:id')
  async singleTask(@Param('id') id, @Res() res: Response) {
    this.validateUser();
    const single = await this.workService.getTaskById(id);
    return res.render('admin/singleTask', { single });
  }

  @Get('/singleProduct/:id')
  async singleProduct(@Param('id') id, @Res() res: Response) {
    this.validateUser();
    const single = await this.productService.getProductById(id);
    return res.render('admin/singleProduct', { single });
  }

  @Get('/singleDelivery/:id')
  async singleDelivery(@Param('id') id, @Res() res: Response) {
    this.validateUser();
    const single = await this.deliveryService.getDeliveryById(id);
    return res.render('admin/singleDelivery', { single });
  }

  @Get('/createUser')
  @Render('admin/addUser')
  createUser() {
    this.validateUser();
    return;
  }

  @Post('createUser')
  async createUserPost(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res() res: Response
  ) {
    this.validateUser();
    await this.authService.signUp(authCredentialsDto);
    return res.render('admin/panel');
  }

  validateUser() {
    if (Log.logged) {
      if (Log.role !== 'admin') {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      } else {
        return;
      }
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
