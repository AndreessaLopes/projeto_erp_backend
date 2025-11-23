import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Store } from "../entities/stores.entity";

@Injectable()
export class StoresRepository {
  constructor(
    @InjectRepository(Store)
    private readonly repo: Repository<Store>,
  ) {}

  createStore(data: Partial<Store>) {
    const Store = this.repo.create(data);
    return this.repo.save(Store);
  }

  findAll() {
    return this.repo.find({ where: { active: true } });
  }

  async findById(id: string) {
    const Store = await this.repo.findOne({ where: { id, active: true } });

    if (!Store) throw new NotFoundException("Store not found");
    return Store;
  }

  async updateStore(id: string, data: Partial<Store>) {
    const Store = await this.findById(id);
    Object.assign(Store, data);
    return this.repo.save(Store);
  }

  async deleteStore(id: string) {
    await this.repo.update(id, { active: false, deletedAt: new Date() });
  }
}
