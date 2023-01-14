import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from 'src/controllers/admin.controller';
import { AuthModule } from 'src/modules/auth.module';
import { DeliveryRepository } from 'src/repositories/delivery.repository';
import { ProductRepository } from 'src/repositories/product.repository';
import { AuthService } from 'src/services/auth.service';
import { DeliveryService } from 'src/services/delivery.service';
import { ProductService } from 'src/services/product.service';
import { WorkRepository } from '../repositories/work.repository';
import { UsersRepository } from '../repositories/users.reposository';

import { WorkService } from '../services/work.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([WorkRepository]),
    TypeOrmModule.forFeature([UsersRepository]),
    TypeOrmModule.forFeature([ProductRepository]),
    TypeOrmModule.forFeature([DeliveryRepository]),
    JwtModule.register({
      secret: 'topsecret51',
      signOptions: {
        expiresIn: 3600
      }
    })
  ],
  controllers: [AdminController],
  providers: [WorkService, AuthService, ProductService, DeliveryService]
})
export class AdminModule {}
