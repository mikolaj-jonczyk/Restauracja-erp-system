import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChefController } from 'src/controllers/chef.controller';
import { WorkRepository } from '../repositories/work.repository';
import { WorkService } from '../services/work.service';
import { ProductRepository } from 'src/repositories/product.repository';
import { ProductService } from 'src/services/product.service';
import { WorkModule } from './work.module';
import { ProductModule } from './product.module';

@Module({
  imports: [
    WorkModule,
    ProductModule,
    TypeOrmModule.forFeature([WorkRepository]),
    TypeOrmModule.forFeature([ProductRepository]),
    JwtModule.register({
      secret: 'topsecret51',
      signOptions: {
        expiresIn: 3600
      }
    })
  ],
  controllers: [ChefController],
  providers: [WorkService, ProductService]
})
export class ChefModule {}
