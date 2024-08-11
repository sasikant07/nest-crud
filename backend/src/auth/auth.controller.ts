import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user/register')
  async register(
    @Body() CreateUserDto: CreateUserDto,
  ): Promise<{ token: string; message: string }> {
    return await this.authService.register_user(CreateUserDto);
  }

  @Post('user/login')
  async login(
    @Body() LoginUserDto: LoginUserDto,
  ): Promise<{ token: string; message: string }> {
    return await this.authService.login_user(LoginUserDto);
  }
}
