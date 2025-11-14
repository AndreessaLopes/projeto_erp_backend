import { Entity, Column, BeforeInsert, ManyToOne, JoinColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { BaseEntity } from "../../../infrastructure/database/base.entity";
import { Role } from "src/modules/roles/entities/role.entity";

@Entity("users")
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role: Role;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
