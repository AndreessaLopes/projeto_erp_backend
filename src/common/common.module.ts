import { Module } from '@nestjs/common';
import { CommomController } from './common.controller';
import { CommonService } from './common.service';

@Module({
  controllers: [CommomController],
  providers: [CommonService],
})
export class CommomModule {}
