import { BaseEntity } from "src/infrastructure/database/base.entity";
import { Product } from "src/modules/products/entities/products.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { MovementType } from "../dto/createMovement.dto";
import { Store } from "src/modules/stores/entities/stores.entity";

@Entity('movements')
export class Movement extends BaseEntity {
  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ManyToOne(() => Store, { eager: true })
  @JoinColumn({ name: "store_id" })
  store: Store;

  @Column({
    type: "enum",
    enum: MovementType
  })
  type: MovementType;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  reason: string;
}

