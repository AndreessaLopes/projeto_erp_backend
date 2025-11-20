import { 
  CreateDateColumn, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn, 
  Column 
} from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Column({ default: true })
  active: boolean;

  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date | null;
}
