import { Body, Controller, Get, Post } from '@nestjs/common';
import { Delivery } from './models/delivery.model';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
export class DeliveryController {
  constructor(private deliveryService: DeliveryService) {}

  @Get()
  getAllPorducts(): Delivery[] {
    return this.deliveryService.getAll();
  }

  @Post()
  addProduct(@Body() createDelivery: Delivery): void {
    return this.deliveryService.add(createDelivery);
  }
}