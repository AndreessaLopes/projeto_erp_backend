import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "../../../infrastructure/database/base.entity";
import { User } from "src/modules/users/entities/user.entity";

@Entity("roles")
export class Role extends BaseEntity {
    @Column({ unique: true })
    name: string;

    @Column({ nullable: true})
    description: string

    @OneToMany(() => User, (user) => user.role)
    users: User[]
}