import { BaseEntity } from 'src/infrastructure/database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('analytics')
export class Analytics extends BaseEntity {

  @Column()
  event: string;               

  @Column('jsonb')
  metadata: any;               

  @Column()
  source: string;              

  @Column({ nullable: true })
  description?: string;
}
