import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkModule } from './modules/work.module';
import { AuthModule } from './modules/auth.module';
import { AdminModule } from './modules/admin.module';
import { BossModule } from './modules/boss.module';
import { ChefModule } from './modules/chef.module';
import { ProductModule } from './modules/product.module';
import { DeliveryModule } from './modules/delivery.module';
import { CookModule } from './modules/cook.module';
import { WorkerController } from './controllers/worker.controller';
import { WorkerModule } from './modules/worker.module';

@Module({
  imports: [
    ProductModule,
    WorkModule,
    DeliveryModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin1234',
      database: 'erp-restauracja',
      autoLoadEntities: true,
      synchronize: true
    }),
    AuthModule,
    AdminModule,
    BossModule,
    ChefModule,
    CookModule,
    WorkerModule
  ],
  providers: [],
  controllers: [WorkerController]
})
export class AppModule {}
