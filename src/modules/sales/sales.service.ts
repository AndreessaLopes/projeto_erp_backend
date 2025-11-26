// andreessalopes/projeto_erp_backend/projeto_erp_backend-e8204cd37e6c3055568073723d4cfd98c76ecb6e/src/modules/sales/sales.service.ts
import { Injectable, BadRequestException } from "@nestjs/common"; // 👈 Adicionado BadRequestException
import { SalesRepository } from "./repository/sales.repository";
import { CustomersRepository } from "src/modules/customers/repository/customers.repository";
import { ProductsRepository } from "src/modules/products/repository/products.repository";
import { StoresRepository } from "src/modules/stores/repository/stores.repository";
import { UserRepository } from "src/modules/users/repository/user.repository";
import { CreateSaleDto } from "./dto/create-sales.dto";
import { Sale } from "./entities/sale.entity";
// 👈 NOVAS IMPORTAÇÕES para gerenciar a transação de estoque
import { DataSource, EntityManager } from 'typeorm';
import { MovementType } from "src/modules/inventory/dto/createMovement.dto";
import { Inventory } from "src/modules/inventory/entities/inventory.entity";
import { Movement } from "src/modules/inventory/entities/inventoryMovement.entity";

@Injectable()
export class SalesService {
  constructor(
    private readonly salesRepo: SalesRepository,
    private readonly customersRepo: CustomersRepository,
    private readonly productsRepo: ProductsRepository,
    private readonly storesRepo: StoresRepository,
    private readonly usersRepo: UserRepository,
    private readonly dataSource: DataSource // 👈 Injetar DataSource
  ) {}

  private calculateTotal(price: number, quantity: number): number {
    return Number(price) * quantity;
  }

  async create(dto: CreateSaleDto): Promise<Sale> {
    // 1. Envolve toda a lógica em uma transação para atomicidade (Venda + Estoque)
    return this.dataSource.transaction(async (manager: EntityManager) => {
      
      // Validações de existência (lê de fora da transação, OK para Entidades Relacionadas)
      const customer = await this.customersRepo.validateExistsOrFail(
        dto.customerId
      );
      const product = await this.productsRepo.validateExistsOrFail(dto.productId);
      const store = await this.storesRepo.validateExistsOrFail(dto.storeId);
      const seller = await this.usersRepo.validateExistsOrFail(dto.sellerId);

      // 2. Controle de Estoque (Atomico com Pessimistic Lock)
      const inventoryRepository = manager.getRepository(Inventory);
      const movementRepository = manager.getRepository(Movement);

      // Busca o inventário pelo ID do produto E da loja com lock pessimista
      const inventory = await inventoryRepository.findOne({
          where: { 
              product: { id: dto.productId }, 
              store: { id: dto.storeId },
              active: true 
          } as any, 
          lock: { mode: 'pessimistic_write' },
      });

      if (!inventory) {
          throw new BadRequestException('Inventário não encontrado para o produto nesta loja.');
      }

      if (inventory.quantity < dto.quantity) {
          // Se não houver estoque, lança exceção que fará o TypeORM realizar o rollback.
          throw new BadRequestException(
            `Estoque insuficiente para o produto ${product.name}. Disponível: ${inventory.quantity}, Solicitado: ${dto.quantity}`
          );
      }

      // Atualiza e salva o estoque (baixa)
      inventory.quantity -= dto.quantity;
      await inventoryRepository.save(inventory);

      // Cria registro de movimento de estoque (histórico)
      const movement = movementRepository.create({
          product: { id: dto.productId } as any,
          store: { id: dto.storeId } as any,
          quantity: dto.quantity,
          type: MovementType.OUT, // Venda é uma saída (OUT)
          reason: 'Venda realizada',
      });
      await movementRepository.save(movement);

      // 3. Salva a Venda
      const total = this.calculateTotal(product.price, dto.quantity);
      const salesRepository = manager.getRepository(Sale);

      const sale = salesRepository.create({
        customer,
        product,
        store,
        seller,
        quantity: dto.quantity,
        total,
      });

      return await salesRepository.save(sale);
    });
  }

  async findAll() {
    return this.salesRepo.findAll();
  }

  async findById(id: string) {
    return this.salesRepo.findById(id);
  }

  async update(id: string, data: Partial<Sale>): Promise<Sale> {
    const sale = await this.findById(id);

    // Nota: Para um sistema de produção, qualquer alteração na quantidade 
    // deve envolver a reversão do movimento de estoque anterior e a aplicação 
    // de um novo movimento na mesma transação. Para este MVP, manteremos 
    // apenas o cálculo do total.
    if (data.quantity) {
      const product = await this.productsRepo.findById(sale.product.id);
      sale.total = this.calculateTotal(product.price, data.quantity);
    }

    Object.assign(sale, data);

    return await this.salesRepo.save(sale);
  }

  async delete(id: string) {
    // Nota: Para um MVP profissional, a exclusão lógica da venda (soft delete) 
    // deveria idealmente reverter o movimento de estoque, criando um movimento 
    // de entrada (IN) no inventário.
    return this.salesRepo.deleteSale(id);
  }
}