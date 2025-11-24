import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../../infrastructure/database/base.entity";

@Entity("customers")
export class Customers extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  document?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ default: "individual" })
  type: "individual" | "company";
}
