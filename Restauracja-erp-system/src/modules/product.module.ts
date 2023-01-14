import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from 'src/repositories/product.repository';
import { ProductService } from 'src/services/product.service';
import { ProductController } from '../controllers/product.controller';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([ProductRepository])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
