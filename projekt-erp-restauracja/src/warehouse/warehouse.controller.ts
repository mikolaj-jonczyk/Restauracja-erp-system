import { Body, Controller, Get, Post } from '@nestjs/common';
import { Product } from './models/product.model';
import { WarehouseService } from './warehouse.service';

@Controller('warehouse')
export class WarehouseController {
  constructor(private warehouseService: WarehouseService) {}

  @Get()
  getAllPorducts(): Product[] {
    return this.warehouseService.getAll();
  }

  @Post()
  addProduct(@Body() createProduct: Product): void {
    return this.warehouseService.add(createProduct);
  }
}
