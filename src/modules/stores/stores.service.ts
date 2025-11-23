import { Injectable } from "@nestjs/common";
import { StoresRepository } from "./repository/stores.repository";
import { CreateStoresDto } from "./dto/create-stores.dto";

@Injectable()
export class StoresService {
  constructor(private readonly repo: StoresRepository) {}

  create(dto: CreateStoresDto) {
    return this.repo.createStore(dto);
  }

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: string) {
    return this.repo.findById(id);
  }

  update(id: string, dto: Partial<CreateStoresDto>) {
    return this.repo.updateStore(id, dto);
  }

  remove(id: string) {
    return this.repo.deleteStore(id);
  }
}
