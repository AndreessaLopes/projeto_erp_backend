import { Injectable } from "@nestjs/common";
import { RoleRepository } from "./repository/role.repository";
import { CreateRoleDto } from "./dto/create-role.dto";

@Injectable()
export class RolesService {
  constructor(private readonly roleRepository: RoleRepository) {}

  create(dto: CreateRoleDto) {
    return this.roleRepository.createRole(dto);
  }

  findAll() {
    return this.roleRepository.findAll();
  }

  findById(id: string) {
    return this.roleRepository.findById(id);
  }

  findByName(name: string) {
    return this.roleRepository.findByName(name);
  }

  remove(id: string) {
    return this.roleRepository.deleteRole(id);
  }
}
