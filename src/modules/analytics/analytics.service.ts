import { Injectable, NotFoundException } from '@nestjs/common';
import { AnalyticsRepository } from './repository/analytics.repository';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';

@Injectable()
export class AnalyticsService {
  constructor(private readonly repository: AnalyticsRepository) {}

  async create(dto: CreateAnalyticsDto) {
    const analytics = this.repository.create(dto);
    return this.repository.save(analytics);
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const record = await this.repository.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Analytics record not found');
    return record;
  }

  async update(id: string, dto: UpdateAnalyticsDto) {
    const analytics = await this.findOne(id);
    Object.assign(analytics, dto);
    return this.repository.save(analytics);
  }

  async remove(id: string) {
    const analytics = await this.findOne(id);
    return this.repository.remove(analytics);
  }
}
