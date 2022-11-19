import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { WarehouseController } from './warehouse/warehouse.controller';
import { KitchenController } from './kitchen/kitchen.controller';
import { WorkController } from './work/work.controller';
import { DeliveryController } from './delivery/delivery.controller';
import { UsersService } from './users/users.service';
import { KitchenService } from './kitchen/kitchen.service';
import { WarehouseService } from './warehouse/warehouse.service';
import { WorkService } from './work/work.service';
import { DeliveryService } from './delivery/delivery.service';
import { WorkModule } from './work/work.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { KitchenModule } from './kitchen/kitchen.module';
import { UsersModule } from './users/users.module';
import { DeliveryModule } from './delivery/delivery.module';

@Module({
  imports: [WorkModule, WarehouseModule, KitchenModule, UsersModule, DeliveryModule],
  controllers: [AppController, UsersController, WarehouseController, KitchenController, WorkController, DeliveryController],
  providers: [AppService, UsersService, KitchenService, WarehouseService, WorkService, DeliveryService],
})
export class AppModule {}
