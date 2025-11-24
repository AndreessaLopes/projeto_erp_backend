import { IsString, IsEmail, IsOptional, IsIn } from "class-validator";

export class CreateCustomerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  document?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsIn(["individual", "company"])
  type?: "individual" | "company";
}
