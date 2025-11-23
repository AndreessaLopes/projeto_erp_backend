import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "../../../infrastructure/database/base.entity";
import { Product } from "../../products/entities/products.entity";
import { Store } from "src/modules/stores/entities/stores.entity";

@Entity("inventory")
export class Inventory extends BaseEntity {
  @ManyToOne(() => Product, (product) => product.inventory, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product: Product;

    @ManyToOne(() => Store, (store) => store.inventory, { eager: true })
    @JoinColumn({ name: "store_id" })
    store: Store;

  @Column({ type: "int" })
  quantity: number;

  @Column({ type: "int", default: 0 })
  minQuantity: number;
}
