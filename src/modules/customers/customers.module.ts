import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customers } from "./entities/customers.entity";
import { CustomersController } from "./customers.controller";
import { CustomersService } from "./customers.service";
import { CustomersRepository } from "./repository/customers.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Customers])],
  controllers: [CustomersController],
  providers: [CustomersService, CustomersRepository],
  exports: [CustomersRepository, CustomersService],
})
export class CustomersModule {}
