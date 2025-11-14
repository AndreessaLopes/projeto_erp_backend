import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: any) {
  const existing = await this.usersService.findByEmail(data.email);
  if (existing) {
    throw new UnauthorizedException('E-mail já cadastrado');
  }

  const user = await this.usersService.create(data); // sem hash manual
  return { message: 'Usuário registrado com sucesso', user };
}


  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Senha incorreta');

    const token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role.name });
    return { access_token: token };
  }

  async validateUser(payload: any) {
    return this.usersService.findOne(payload.sub);
  }
}
