import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "src/modules/products/entities/products.entity";
import { Inventory } from "src/modules/inventory/entities/inventory.entity";

@Injectable()
export class InventorySeeder implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(Inventory)
    private readonly inventoryRepo: Repository<Inventory>
  ) {}

  async onModuleInit() {
    // create fake products if none
    const count = await this.productRepo.count();
    if (count === 0) {
      const p1 = this.productRepo.create({ name: 'Produto Seed A', price: 10.5 });
      const p2 = this.productRepo.create({ name: 'Produto Seed B', price: 25.0 });
      await this.productRepo.save([p1, p2]);

      // create inventory
      await this.inventoryRepo.save([
        this.inventoryRepo.create({ product: p1, quantity: 50, minQuantity: 5 }),
        this.inventoryRepo.create({ product: p2, quantity: 20, minQuantity: 2 }),
      ]);

      console.log('Seeded products + inventory');
    }
  }
}
