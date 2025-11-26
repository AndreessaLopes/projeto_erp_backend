import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Analytics } from '../entities/analytics.entity';

@Injectable()
export class AnalyticsRepository extends Repository<Analytics> {
  constructor(private dataSource: DataSource) {
    super(Analytics, dataSource.createEntityManager());
  }
}
