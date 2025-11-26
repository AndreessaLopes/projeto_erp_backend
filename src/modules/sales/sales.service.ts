import { Injectable } from "@nestjs/common";
import { SalesRepository } from "./repository/sales.repository";
import { CustomersRepository } from "src/modules/customers/repository/customers.repository";
import { ProductsRepository } from "src/modules/products/repository/products.repository";
import { StoresRepository } from "src/modules/stores/repository/stores.repository";
import { UserRepository } from "src/modules/users/repository/user.repository";
import { CreateSaleDto } from "./dto/create-sales.dto";
import { Sale } from "./entities/sale.entity";

@Injectable()
export class SalesService {
  constructor(
    private readonly salesRepo: SalesRepository,
    private readonly customersRepo: CustomersRepository,
    private readonly productsRepo: ProductsRepository,
    private readonly storesRepo: StoresRepository,
    private readonly usersRepo: UserRepository
  ) {}

  private calculateTotal(price: number, quantity: number): number {
    return Number(price) * quantity;
  }

  async create(dto: CreateSaleDto): Promise<Sale> {
    const customer = await this.customersRepo.validateExistsOrFail(
      dto.customerId
    );
    const product = await this.productsRepo.validateExistsOrFail(dto.productId);
    const store = await this.storesRepo.validateExistsOrFail(dto.storeId);
    const seller = await this.usersRepo.validateExistsOrFail(dto.sellerId);

    const total = this.calculateTotal(product.price, dto.quantity);

    return await this.salesRepo.save({
      customer,
      product,
      store,
      seller,
      quantity: dto.quantity,
      total,
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

    if (data.quantity) {
      const product = await this.productsRepo.findById(sale.product.id);
      sale.total = this.calculateTotal(product.price, data.quantity);
    }

    Object.assign(sale, data);

    return await this.salesRepo.save(sale);
  }

  async delete(id: string) {
    return this.salesRepo.deleteSale(id);
  }
}
