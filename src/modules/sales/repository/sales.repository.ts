import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Sale } from "../entities/sale.entity";

@Injectable()
export class SalesRepository extends Repository<Sale> {
  constructor(dataSource: DataSource) {
    super(Sale, dataSource.createEntityManager());
  }

  async findAll() {
    return await this.find({
      where: { active: true },
      relations: ["customer", "product", "store", "seller"],
    });
  }

  async findById(id: string) {
    const sale = await this.findOne({
      where: { id, active: true },
      relations: ["customer", "product", "store", "seller"],
    });

    if (!sale) throw new NotFoundException("Sale not found");

    return sale;
  }

  async validateExistsOrFail(id: string) {
    return this.findById(id);
  }

  async updateSale(id: string, data: Partial<Sale>) {
    const sale = await this.findById(id);
    Object.assign(sale, data);
    return await this.save(sale);
  }

  async deleteSale(id: string) {
    await this.update(id, { active: false, deletedAt: new Date() });
  }
}
