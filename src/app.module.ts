import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommomModule } from './common/common.module';
import { SeedersModule } from './common/seeders/seeders.module';
import { ConfigModule } from './config/config.module';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { ProductsModule } from './modules/products/products.module';
import { ReportsModule } from './modules/reports/reports.module';
import { RolesModule } from './modules/roles/roles.module';
import { SalesModule } from './modules/sales/sales.module';
import { StoresModule } from './modules/stores/stores.module';
import { InventoryService } from './modules/inventory/inventory.service';
import { InventoryModule } from './modules/inventory/inventory.module';
import { CustomersController } from './modules/customers/customers.controller';
import { CustomersModule } from './modules/customers/customers.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RolesModule,
    ProductsModule,
    SalesModule,
    StoresModule,
    ReportsModule,
    AnalyticsModule,
    CommomModule,
    CoreModule,
    ConfigModule,
    InfrastructureModule,
    DatabaseModule,
    SeedersModule,
    CategoryModule,
    InventoryModule,
    CustomersModule, 
  ],
  controllers: [AppController, CustomersController],
  providers: [AppService, InventoryService],
})
export class AppModule {}
