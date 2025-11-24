import { Entity, ManyToOne, Column } from "typeorm";
import { Customers } from "src/modules/customers/entities/customers.entity";
import { Product } from "src/modules/products/entities/products.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Store } from "src/modules/stores/entities/stores.entity";
import { BaseEntity } from "src/infrastructure/database/base.entity";

@Entity()
export class Sale extends BaseEntity {

  @ManyToOne(() => Customers, { nullable: false })
  customer: Customers;

  @ManyToOne(() => Product, { nullable: false })
  product: Product;

  @ManyToOne(() => Store, { nullable: false })
  store: Store;

  @ManyToOne(() => User, { nullable: false })
  seller: User;

  @Column("int")
  quantity: number;

  @Column("decimal", { precision: 10, scale: 2 })
  total: number;
}
