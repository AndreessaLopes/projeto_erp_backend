import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const user = this.repository.create({
      name: data.name,
      email: data.email,
      password: data.password,
      role: { id: data.roleId },
    });

    return this.repository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.repository.find({
      relations: ["role"],
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({
      where: { id },
      relations: ["role"],
    });
  }

  async updateUser(id: string, data: Partial<UpdateUserDto>): Promise<User> {
    const user = await this.repository
  .createQueryBuilder("user")
  .addSelect("user.password")
  .leftJoinAndSelect("user.role", "role")
  .where("user.id = :id", { id })
  .getOne();


    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    // Se mudar o roleId — atualiza o relacionamento
    if (data.roleId) {
      user.role = { id: data.roleId } as any;
      delete data.roleId;
    }

    // Atualiza os demais campos
    Object.assign(user, data);

    return this.repository.save(user);
  }

  async deleteUser(id: string): Promise<void> {
    // Soft delete padrão com active + deletedAt
    await this.repository.update(id, {
      active: false,
      deletedAt: new Date(),
    });
  }

  async findByEmail(email: string): Promise<User | null> {
  return this.repository
    .createQueryBuilder("user")
    .addSelect("user.password")
    .leftJoinAndSelect("user.role", "role")
    .where("user.email = :email", { email })
    .getOne();
}
}
