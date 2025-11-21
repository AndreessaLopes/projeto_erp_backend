import { IsUUID, IsNumber, IsEnum, IsOptional, IsString } from "class-validator";

export enum MovementType {
  IN = "IN",
  OUT = "OUT",
}

export class CreateMovementDto {
  @IsUUID()
  productId: string;

  @IsUUID()
  storeId: string;

  @IsEnum(MovementType)
  type: MovementType;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  reason?: string; // Ex: Venda, Reposição, Quebra
}
