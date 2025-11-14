import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../../modules/roles/entities/role.entity';
import { User } from '../../modules/users/entities/user.entity';
import { RoleSeeder } from './roles.seeder';
import { UserSeeder } from './user.seeder';
import { RoleRepository } from '../../modules/roles/repository/role.repository';
import { UserRepository } from '../../modules/users/repository/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, User]),
  ],
  providers: [
    RoleSeeder,
    UserSeeder,
    RoleRepository,
    UserRepository,
  ],
})
export class SeedersModule {}
