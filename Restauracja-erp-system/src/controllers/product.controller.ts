import { Controller } from '@nestjs/common';
import { ProductService } from 'src/services/product.service';

@Controller('product')
export class ProductController {
  constructor(private prescriptionsService: ProductService) {}
}
