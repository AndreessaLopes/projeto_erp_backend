import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './repository/role.repository';
import { Role } from './entities/role.entity';
import { RoleSeeder } from '../../common/seeders/roles.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService, RoleRepository, RoleSeeder],
  exports: [RolesService, RoleRepository]
})
export class RolesModule {}
