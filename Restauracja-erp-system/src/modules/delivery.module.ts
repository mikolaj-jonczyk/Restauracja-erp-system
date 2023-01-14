import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryController } from 'src/controllers/delivery.controller';
import { DeliveryRepository } from 'src/repositories/delivery.repository';
import { DeliveryService } from '../services/delivery.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([DeliveryRepository])],
  controllers: [DeliveryController],
  providers: [DeliveryService]
})
export class DeliveryModule {}
