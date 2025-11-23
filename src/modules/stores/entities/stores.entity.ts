import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../../infrastructure/database/base.entity";
import { Inventory } from "src/modules/inventory/entities/inventory.entity";

@Entity("stores")
export class Store extends BaseEntity {
  @Column({ unique: true})
  name: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @OneToMany(() => Inventory, (inventory) => inventory.store)
  inventory: Inventory[];
}
