import { Controller, Post, Get, Body, Param, Patch, Delete } from "@nestjs/common";
import { SalesService } from "./sales.service";
import { CreateSaleDto } from "./dto/create-sales.dto";

@Controller("sales")
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() dto: CreateSaleDto) {
    return this.salesService.create(dto);
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.salesService.findById(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() data: any) {
    return this.salesService.update(id, data);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.salesService.delete(id);
  }
}
