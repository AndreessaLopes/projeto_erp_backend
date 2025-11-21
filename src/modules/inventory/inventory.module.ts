import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Movement } from './entities/inventoryMovement.entity';
import { InventoryRepository } from './repository/inventory.repository';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { MovementController } from './movement.controller';
import { MovementRepository } from './repository/movement.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory, Movement])],
  controllers: [InventoryController, MovementController],
  providers: [InventoryService, InventoryRepository, MovementRepository],
  exports: [InventoryService, InventoryRepository],
})
export class InventoryModule {}
