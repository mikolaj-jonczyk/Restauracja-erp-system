import { EntityRepository, Repository } from 'typeorm';
import { Product } from 'src/models/products/product.entity';
import { CrateProductDto } from 'src/models/products/dto/create-product.dto';
import { GetProductsDto } from 'src/models/products/dto/get-products.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(createProductDto: CrateProductDto): Promise<Product> {
    const { name, quantity } = createProductDto;

    const task = this.create({
      name,
      quantity
    });
    await this.save(task);
    return task;
  }

  async getTasks(filterDto: GetProductsDto): Promise<Product[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('product');

    if (search) {
      query.andWhere('(LOWER(product.description) LIKE LOWER(:search)', {
        search: `%${search}%`
      });
    }

    const tasks = await query.getMany();

    return tasks;
  }
}
