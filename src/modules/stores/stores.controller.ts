import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { StoresService } from "./stores.service";
import { CreateStoresDto } from "./dto/create-stores.dto";
import { UpdateStoreDto } from "./dto/update-stores.dto";

@Controller("stores")
export class StoresController {
  constructor(private readonly service: StoresService) {}

  @Post()
  create(@Body() dto: CreateStoresDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.service.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateStoreDto
  ) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.service.remove(id);
  }
}
