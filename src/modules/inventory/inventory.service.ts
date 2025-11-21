import { Injectable } from '@nestjs/common';
import { InventoryRepository } from './repository/inventory.repository';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { CreateMovementDto } from './dto/createMovement.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly repo: InventoryRepository) {}

  create(dto: CreateInventoryDto) {
    return this.repo.createInventory(dto);
  }

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: string) {
    return this.repo.findById(id);
  }

  update(id: string, dto: Partial<CreateInventoryDto>) {
    return this.repo.updateInventory(id, dto);
  }

  remove(id: string) {
    return this.repo.deleteInventory(id);
  }

  // 🔥 importante
  registerMovement(dto: CreateMovementDto) {
    return this.repo.registerMovement(dto);
  }
}
