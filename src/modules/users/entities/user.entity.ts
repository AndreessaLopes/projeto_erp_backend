import {
  Entity,
  Column,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from '../../../infrastructure/database/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
