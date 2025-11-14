import { Injectable, NotFoundException } from "@nestjs/common";
import { Role } from "../entities/role.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>
  ) {}

  async createRole(userRole: Partial<Role>): Promise<Role> {
    const role = this.repository.create(userRole);
    return this.repository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Role | null> {
    return this.repository.findOne({ where: { name } });
  }

  async findById(id: string): Promise<Role> {
    const role = await this.repository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role whit id ${id} not found`);
    }
    return role;
  }

  async deleteRole(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
