import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Store } from "./entities/stores.entity";
import { StoresController } from "./stores.controller";
import { StoresService } from "./stores.service";
import { StoresRepository } from "./repository/stores.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  controllers: [StoresController],
  providers: [StoresService, StoresRepository],
  exports: [StoresRepository],
})
export class StoresModule {}
