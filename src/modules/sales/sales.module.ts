import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sale } from "./entities/sale.entity";
import { SalesRepository } from "./repository/sales.repository";
import { SalesService } from "./sales.service";
import { SalesController } from "./sales.controller";

import { CustomersModule } from "../customers/customers.module";
import { ProductsModule } from "../products/products.module";
import { StoresModule } from "../stores/stores.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale]),
    CustomersModule,
    ProductsModule,
    StoresModule,
    UsersModule
  ],
  controllers: [SalesController],
  providers: [SalesRepository, SalesService],
  exports: [SalesRepository, SalesService]
})
export class SalesModule {}
