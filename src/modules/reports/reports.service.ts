import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { FilterReportDto } from './dto/filter-report.dto';
import { ReportsRepository } from './repository/reports.repository';

@Injectable()
export class ReportsService {
  constructor(private readonly reportsRepository: ReportsRepository) {}

  async create(dto: CreateReportDto) {
    const report = this.reportsRepository.create(dto);
    return this.reportsRepository.save(report);
  }

  async findAll(filters: FilterReportDto) {
    return this.reportsRepository.findWithFilters(filters);
  }

  async findOne(id: string) {
    const report = await this.reportsRepository.findOne({ where: { id } });
    if (!report) throw new NotFoundException('Report not found');
    return report;
  }

  async update(id: string, dto: UpdateReportDto) {
    const report = await this.findOne(id);
    Object.assign(report, dto);
    return this.reportsRepository.save(report);
  }

  async remove(id: string) {
    const report = await this.findOne(id);
    return this.reportsRepository.remove(report);
  }
}
