import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../modules/users/entities/user.entity";
import * as bcrypt from "bcrypt";
import { Role } from "../../modules/roles/entities/role.entity";

@Injectable()
export class UserSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  async onModuleInit() {
    const adminRole = await this.roleRepository.findOne({
      where: { name: "admin" },
    });

    if (!adminRole) return;

    const adminExists = await this.userRepository.findOne({
      where: { email: "admin@system.com" },
    });

    if (adminExists) return;

    const passwordPlain = "admin123";
    const user = this.userRepository.create({
      name: "Administrator",
      email: "admin@system.com",
      password: passwordPlain,
      role: adminRole,
    });

    await this.userRepository.save(user);

    console.log("👑 Usuário ADMIN criado: admin@system.com / admin123");
  }
}
