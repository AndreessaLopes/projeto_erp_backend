import { Injectable, NotFoundException } from "@nestjs/common";
import { Role } from "../entities/role.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRoleDto } from "../dto/create-role.dto";

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>
  ) {}

  async createRole(dto: CreateRoleDto): Promise<Role> {
    const role = this.repository.create(dto);
    return this.repository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.repository.find({
      where: { active: true },
    });
  }

  async findByName(name: string): Promise<Role | null> {
    return this.repository.findOne({
      where: { name, active: true },
    });
  }

  async findById(id: string): Promise<Role> {
    const role = await this.repository.findOne({
      where: { id, active: true },
    });

    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }

    return role;
  }

  async deleteRole(id: string): Promise<void> {
    const exists = await this.repository.findOne({ where: { id } });

    if (!exists) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }

    await this.repository.update(id, {
      active: false,
      deletedAt: new Date(),
    });
  }
}
