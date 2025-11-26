import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Report } from '../entities/report.entity';
import { FilterReportDto } from '../dto/filter-report.dto';

@Injectable()
export class ReportsRepository extends Repository<Report> {
  constructor(private dataSource: DataSource) {
    super(Report, dataSource.createEntityManager());
  }

  async findWithFilters(filters: FilterReportDto): Promise<Report[]> {
    const { type, search } = filters;

    const query = this.createQueryBuilder('report');

    if (type) query.andWhere('report.type = :type', { type });

    if (search) {
      query.andWhere(
        '(report.title ILIKE :search OR report.description ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    return query.orderBy('report.created_at', 'DESC').getMany();
  }
}
