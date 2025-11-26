import { IsNotEmpty, IsString, IsOptional, IsObject } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsObject()
  @IsNotEmpty()
  data: any;

  @IsString()
  @IsOptional()
  description?: string;
}
