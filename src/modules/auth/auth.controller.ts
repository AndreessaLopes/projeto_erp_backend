import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Query,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { LoginDto } from "./dto/login.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }

  @Post("login")
  async login(@Body() data: LoginDto) {
    return this.authService.login(data.email, data.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Req() req) {
    return req.user;
  }

  @Post("forgot-password")
  forgotPassword(@Body() data: ForgotPasswordDto) {
    return this.authService.forgotPassword(data.email);
  }

  @Get("validate-reset-token")
  validateToken(@Query("token") token: string) {
    try {
      this.authService.validateResetToken(token);
      return { valid: true };
    } catch {
      return { valid: false };
    }
  }

  @Post("reset-password")
  resetPassword(@Body() data: ResetPasswordDto) {
    return this.authService.resetPassword(data.token, data.newPassword);
  }
}
