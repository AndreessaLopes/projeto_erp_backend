import { IsOptional, IsString } from 'class-validator';

export class FilterReportDto {
  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
