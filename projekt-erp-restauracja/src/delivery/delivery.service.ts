import { Injectable } from '@nestjs/common';
import { Delivery } from './models/delivery.model';

@Injectable()
export class DeliveryService {
  private readonly deliveries: Delivery[] = [];

  add(delivery: Delivery) {
    this.deliveries.push(delivery);
  }

  getAll(): Delivery[] {
    return this.deliveries;
  }
}
