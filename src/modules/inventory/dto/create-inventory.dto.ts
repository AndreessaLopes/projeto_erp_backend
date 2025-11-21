import { IsDecimal, IsNumber, IsOptional, IsUUID } from "class-validator";

export class CreateInventoryDto {
  @IsUUID()
  productId: string;

  @IsUUID()
  storeId: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  @IsOptional()
  minQuantity?: number;
}
