import { BaseEntity } from "src/infrastructure/database/base.entity";
import { Category } from "src/modules/category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity("products")
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true, unique: true })
  sku: string;

  @Column({ nullable: true })
  description?: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "SET NULL",
    eager: true,
  })
  @JoinColumn({ name: "category_id" })
  category: Category;
}
