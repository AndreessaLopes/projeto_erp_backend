import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customers } from "../entities/customers.entity";

@Injectable()
export class CustomersRepository {
  constructor(
    @InjectRepository(Customers)
    private readonly repo: Repository<Customers>,
  ) {}

  createCustomer(data: Partial<Customers>) {
    const customer = this.repo.create(data);
    return this.repo.save(customer);
  }

  findAll() {
    return this.repo.find({ where: { active: true } });
  }

  async findById(id: string) {
    const customer = await this.repo.findOne({ where: { id, active: true } });
    if (!customer) throw new NotFoundException("Customer not found");
    return customer;
  }

  async updateCustomer(id: string, data: Partial<Customers>) {
    const customer = await this.findById(id);
    Object.assign(customer, data);
    return this.repo.save(customer);
  }

  async deleteCustomer(id: string) {
    await this.repo.update(id, { active: false, deletedAt: new Date() });
  }

  async validateExistsOrFail(id: string) {
  const entity = await this.findById(id);
  if (!entity) {
    throw new NotFoundException(`Registro não encontrado: ${id}`);
  }
  return entity;
}

}
