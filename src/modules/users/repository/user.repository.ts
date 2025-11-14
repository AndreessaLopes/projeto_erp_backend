import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  async createUser(userData: any): Promise<User> {
    const user = this.repository.create({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: { id: userData.roleId },
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

  async updateUser(id: string, updates: any): Promise<User> {
    const user = await this.repository.findOne({
      where: { id },
      relations: ["role"],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (updates.roleId) {
      user.role = { id: updates.roleId } as any;
      delete updates.roleId;
    }

    Object.assign(user, updates);

    return this.repository.save(user);
  }

  async deleteUser(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: { email },
      relations: ["role"],
    });
  }
}
