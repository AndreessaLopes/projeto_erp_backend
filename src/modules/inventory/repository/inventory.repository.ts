import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Inventory } from "../entities/inventory.entity";
import { Movement } from "../entities/inventoryMovement.entity";
import { Repository, DataSource } from "typeorm";
import { CreateInventoryDto } from "../dto/create-inventory.dto";
import { CreateMovementDto, MovementType } from "../dto/createMovement.dto";

@Injectable()
export class InventoryRepository {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,

    @InjectRepository(Movement)
    private readonly movementRepository: Repository<Movement>,

    private readonly dataSource: DataSource
  ) {}

  // ------------ CREATE INVENTORY ------------
  async createInventory(dto: CreateInventoryDto): Promise<Inventory> {
    const exists = await this.inventoryRepository.findOne({
      where: { product: { id: dto.productId } },
    });

    if (exists) {
      throw new BadRequestException(
        "Inventory already exists for this product"
      );
    }

    const inventory = this.inventoryRepository.create({
      product: { id: dto.productId } as any,
      quantity: dto.quantity,
      minQuantity: dto.minQuantity ?? 0,
    });

    return this.inventoryRepository.save(inventory);
  }

  // ------------ FIND ------------
  async findAll(): Promise<Inventory[]> {
    return this.inventoryRepository.find({
      where: { active: true },
      relations: ["product"],
    });
  }

  async findById(id: string): Promise<Inventory> {
    const inv = await this.inventoryRepository.findOne({
      where: { id, active: true },
      relations: ["product"],
    });

    if (!inv) throw new NotFoundException("Inventory not found");
    return inv;
  }

  // ------------ UPDATE INVENTORY ------------
  async updateInventory(
    id: string,
    dto: Partial<CreateInventoryDto>
  ): Promise<Inventory> {
    const inventory = await this.findById(id);

    if (dto.productId) {
      inventory.product = { id: dto.productId } as any;
      delete dto.productId;
    }

    Object.assign(inventory, dto);

    return this.inventoryRepository.save(inventory);
  }

  // ------------ MOVEMENT WITH TRANSACTION + LOCK ------------
  async registerMovement(dto: CreateMovementDto): Promise<Movement> {
    return await this.dataSource.transaction(async (manager) => {
      // 1 — Buscar inventário com lock pessimista (impede concorrência)
      const inventory = await manager.findOne(Inventory, {
        where: { product: { id: dto.productId } },
        lock: { mode: "pessimistic_write" },
      });

      if (!inventory) {
        throw new NotFoundException("Inventory not found for this product");
      }

      // 2 — Atualizar quantidade (regra de negócio)
      if (dto.type === MovementType.IN) {
        inventory.quantity += dto.quantity;
      } else {
        if (inventory.quantity < dto.quantity) {
          throw new BadRequestException(
            "Not enough stock to perform this movement"
          );
        }
        inventory.quantity -= dto.quantity;
      }

      // 3 — Salvar inventário dentro da transação
      await manager.save(inventory);

      // 4 — Criar movimento dentro da mesma transação
      const movement = manager.create(Movement, {
        product: { id: dto.productId },
        quantity: dto.quantity,
        type: dto.type,
        reason: dto.reason,
      });

      await manager.save(movement);

      return movement;
    });
  }

  // ------------ DELETE LOGIC ------------
  async deleteInventory(id: string): Promise<void> {
    await this.inventoryRepository.update(id, {
      active: false,
      deletedAt: new Date(),
    });
  }
}