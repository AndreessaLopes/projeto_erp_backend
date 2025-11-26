import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  create(dto: CreateUserDto) {
    return this.userRepository.createUser(dto);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException("Usuário não encontrado");
    return user;
  }

  update(id: string, dto: UpdateUserDto) {
    return this.userRepository.updateUser(id, dto);
  }

  remove(id: string) {
    return this.userRepository.deleteUser(id);
  }
  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
}
