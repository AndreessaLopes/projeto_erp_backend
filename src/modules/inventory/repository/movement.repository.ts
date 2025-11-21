import { Injectable, NotFoundException } from "@nestjs/common";
import { Movement } from "../entities/inventoryMovement.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class MovementRepository {
  constructor(
    @InjectRepository(Movement)
    private readonly repository: Repository<Movement>,
  ) {}

  async findAll(): Promise<Movement[]> {
    return this.repository.find({
      order: { createdAt: "DESC" }
    });
  }

  async findById(id: string): Promise<Movement> {
    const mv = await this.repository.findOne({
      where: { id }, 
    });

    if (!mv) throw new NotFoundException("Movement not found");
    return mv;
  }

  async findByInventory(inventoryId: string): Promise<Movement[]> {
  return this.repository.find({
    where: { product: { id: inventoryId } },
    order: { createdAt: 'DESC' },
    relations: ['product'],
  });
}

}
