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
    return;
  }

  @Get('allTasks')
  @Render('admin/allTasks')
  async allTasks(@Query() filterDto: GetTasksFilterDto) {
    const tasks = await this.workService.getTasks(filterDto);
    return { tasks };
  }

  @Get('allProducts')
  @Render('admin/allProducts')
  async allProducts(@Query() filterDto: GetProductsDto) {
    const products = await this.productService.getProducts(filterDto);
    return { products };
  }

  @Get('allDelivery')
  @Render('admin/allDelivery')
  async allDelivery(@Query() filterDto: GetDeliveryDto) {
    const delivery = await this.deliveryService.getDelivery(filterDto);
    return { delivery };
  }

  @Get('allUsers')
  @Render('admin/allUsers')
  async allUsers() {
    const users = await this.authService.listUsers();
    return { users };
  }

  @Get('createTask')
  @Render('admin/createTask')
  async createTask() {
    return;
  }

  @Get('createProduct')
  @Render('admin/createProduct')
  async createProduct() {
    return;
  }

  @Get('createDelivery')
  @Render('admin/createDelivery')
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
    return res.redirect('http://localhost:3000/admin');
  }

  @Post('/singleProduct/deleteProduct/:id')
  async deleteProductById(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<void> {
    await this.productService.deleteProduct(id);
    return res.redirect('http://localhost:3000/admin');
  }

  @Post('/singleDelivery/deleteDelivery/:id')
  async deleteDeliveryById(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<void> {
    await this.deliveryService.deleteDelivery(id);
    return res.redirect('http://localhost:3000/admin');
  }

  @Get('/singleTask/:id')
  async singleTask(@Param('id') id, @Res() res: Response) {
    const single = await this.workService.getTaskById(id);
    return res.render('admin/singleTask', { single });
  }

  @Get('/singleProduct/:id')
  async singleProduct(@Param('id') id, @Res() res: Response) {
    const single = await this.productService.getProductById(id);
    return res.render('admin/singleProduct', { single });
  }

  @Get('/singleDelivery/:id')
  async singleDelivery(@Param('id') id, @Res() res: Response) {
    const single = await this.deliveryService.getDeliveryById(id);
    return res.render('admin/singleDelivery', { single });
  }

  @Get('/createUser')
  @Render('admin/addUser')
  createUser() {
    return;
  }

  @Post('createUser')
  async createUserPost(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res() res: Response
  ) {
    await this.authService.signUp(authCredentialsDto);
    return res.render('admin/panel');
  }
}
