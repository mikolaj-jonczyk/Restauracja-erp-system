import { Injectable } from '@nestjs/common';
import { Product } from './models/product.model';

@Injectable()
export class WarehouseService {
  private readonly products: Product[] = [];

  add(product: Product) {
    this.products.push(product);
  }

  getAll(): Product[] {
    return this.products;
  }
}
