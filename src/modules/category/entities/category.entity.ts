import { BaseEntity } from "src/infrastructure/database/base.entity";
import { Product } from "src/modules/products/entities/products.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity("category")
export class Category extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @Column({ default: true})
  active: boolean
}
