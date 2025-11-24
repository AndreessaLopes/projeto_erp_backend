import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from '../../modules/roles/entities/role.entity';
import { User } from '../../modules/users/entities/user.entity';
import { Product } from '../../modules/products/entities/products.entity';
import { Inventory } from '../../modules/inventory/entities/inventory.entity';

import { RoleSeeder } from './roles.seeder';
import { UserSeeder } from './user.seeder';
import { InventorySeeder } from './inventory.seeder';

import { RoleRepository } from '../../modules/roles/repository/role.repository';
import { UserRepository } from '../../modules/users/repository/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Role,
      User,
      Product,   
      Inventory,   
    ]),
  ],
  providers: [
    RoleSeeder,
    UserSeeder,
    InventorySeeder,
    RoleRepository,
    UserRepository,
  ],
})
export class SeedersModule {}
