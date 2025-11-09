import { Module } from '@nestjs/common';
import { InfrastructureController } from './infrastructure.controller';
import { InfrastructureService } from './infrastructure.service';
import { DatabaseModule } from './database/database.module';

@Module({
  controllers: [InfrastructureController],
  providers: [InfrastructureService],
  imports: [DatabaseModule]
})
export class InfrastructureModule {}
