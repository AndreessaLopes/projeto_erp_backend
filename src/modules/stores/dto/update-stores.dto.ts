import { PartialType } from "@nestjs/mapped-types";
import { CreateStoresDto } from "./create-stores.dto";

export class UpdateStoreDto extends PartialType(CreateStoresDto) {}
