import { Injectable } from "@nestjs/common";
import { CustomersRepository } from "./repository/customers.repository";
import { CreateCustomerDto } from "./dto/create-customer.dto";

@Injectable()
export class CustomersService {
  constructor(private readonly repo: CustomersRepository) {}

  create(dto: CreateCustomerDto) {
    return this.repo.createCustomer(dto);
  }

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: string) {
    return this.repo.findById(id);
  }

  update(id: string, dto: Partial<CreateCustomerDto>) {
    return this.repo.updateCustomer(id, dto);
  }

  remove(id: string) {
    return this.repo.deleteCustomer(id);
  }
}
