import { IsInt, IsUUID, Min } from "class-validator";

export class CreateSaleDto {
  @IsUUID()
  customerId: string;

  @IsUUID()
  productId: string;

  @IsUUID()
  storeId: string;

  @IsUUID()
  sellerId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
