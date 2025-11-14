import { Injectable, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../modules/roles/entities/role.entity';

@Injectable()
export class RoleSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async onModuleInit() {
    const roles = [
      { name: 'admin', description: 'Administrador do sistema' },
      { name: 'manager', description: 'Gerente' },
      { name: 'seller', description: 'Vendedor' },
      { name: 'viewer', description: 'Somente leitura' },
    ];

    for (const role of roles) {
      const exists = await this.roleRepository.findOne({
        where: { name: role.name },
      });

      if (!exists) {
        await this.roleRepository.save(role);
        console.log(`Role criada: ${role.name}`);
      }
    }
  }
}
