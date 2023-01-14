import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BossController } from 'src/controllers/boss.controller';
import { WorkRepository } from '../repositories/work.repository';
import { WorkService } from '../services/work.service';
import { WorkModule } from './work.module';
import { ProductModule } from './product.module';
import { ProductService } from 'src/services/product.service';
import { ProductRepository } from 'src/repositories/product.repository';
import { DeliveryService } from 'src/services/delivery.service';
import { DeliveryRepository } from 'src/repositories/delivery.repository';

@Module({
  imports: [
    WorkModule,
    ProductModule,
    TypeOrmModule.forFeature([WorkRepository]),
    TypeOrmModule.forFeature([ProductRepository]),
    TypeOrmModule.forFeature([DeliveryRepository]),
    JwtModule.register({
      secret: 'topsecret51',
      signOptions: {
        expiresIn: 3600
      }
    })
  ],
  controllers: [BossController],
  providers: [WorkService, ProductService, DeliveryService]
})
export class BossModule {}
