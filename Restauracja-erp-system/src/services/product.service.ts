import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrateProductDto } from 'src/models/products/dto/create-product.dto';
import { GetProductsDto } from 'src/models/products/dto/get-products.dto';
import { Product } from 'src/models/products/product.entity';
import { ProductRepository } from 'src/repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository
  ) {}

  getProducts(filterDto: GetProductsDto): Promise<Product[]> {
    return this.productRepository.getTasks(filterDto);
  }

  async getProductById(id: string): Promise<Product> {
    const found = await this.productRepository.findOne({
      where: { id }
    });
    if (!found) {
      throw new NotFoundException(`Product with this id "${id}" not found!`);
    }

    return found;
  }

  createProduct(createTasknDto: CrateProductDto): Promise<Product> {
    return this.productRepository.createProduct(createTasknDto);
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await this.productRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
