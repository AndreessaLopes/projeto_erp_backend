import { BaseEntity } from 'src/infrastructure/database/base.entity';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reports')
export class Report extends BaseEntity {

  @Column()
  title: string;

  @Column()
  type: string; 

  @Column('jsonb')
  data: any;

  @Column({ nullable: true })
  description?: string;
}
