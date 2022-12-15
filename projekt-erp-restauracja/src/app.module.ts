import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { WarehouseController } from './warehouse/warehouse.controller';
import { WorkController } from './work/work.controller';
import { DeliveryController } from './delivery/delivery.controller';
import { UsersService } from './users/users.service';
import { WarehouseService } from './warehouse/warehouse.service';
import { WorkService } from './work/work.service';
import { DeliveryService } from './delivery/delivery.service';
import { WorkModule } from './work/work.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { UsersModule } from './users/users.module';
import { DeliveryModule } from './delivery/delivery.module';
import { HelpersModule } from './helpers/helpers.module';
import { WorkMapper } from './work/work.mapper';

@Module({
  imports: [WorkModule, WarehouseModule, UsersModule, DeliveryModule, HelpersModule],
  controllers: [AppController, UsersController, WarehouseController, WorkController, DeliveryController],
  providers: [AppService, UsersService, WarehouseService, WorkService, DeliveryService, WorkMapper],
})
export class AppModule {}
