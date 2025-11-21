import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { CreateMovementDto } from "./dto/createMovement.dto";
import { MovementRepository } from "./repository/movement.repository";
import { InventoryRepository } from "./repository/inventory.repository";

@Controller('movements')
export class MovementController {
  constructor(
    private readonly movementRepo: MovementRepository,
    private readonly inventoryRepo: InventoryRepository,
  ) {}

  // Criar movimento (IN/OUT)
  @Post()
  create(@Body() dto: CreateMovementDto) {
    return this.inventoryRepo.registerMovement(dto);
  }

  // Listar todos os movimentos
  @Get()
  findAll() {
    return this.movementRepo.findAll();
  }

  // Listar movimentos de um inventário específico
  @Get('inventory/:inventoryId')
  findByInventory(@Param('inventoryId', new ParseUUIDPipe()) inventoryId: string) {
    return this.movementRepo.findByInventory(inventoryId);
  }

  // Obter movimento por ID
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.movementRepo.findById(id);
  }
}
