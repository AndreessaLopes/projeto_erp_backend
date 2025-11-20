import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsUUID()
  @IsOptional()
  categoryId?: string;
}
