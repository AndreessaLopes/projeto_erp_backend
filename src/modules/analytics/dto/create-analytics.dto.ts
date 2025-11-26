import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateAnalyticsDto {
  @IsString()
  event: string;

  @IsObject()
  metadata: any;

  @IsString()
  source: string;

  @IsOptional()
  @IsString()
  description?: string;
}
