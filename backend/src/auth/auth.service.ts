import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { user, user_model } from './schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(user_model)
    private userModel: mongoose.Model<user>,
    private JwtService: JwtService,
  ) {}
  async register_user(
    CreateUserDto: CreateUserDto,
  ): Promise<{ token: string; message: string }> {
    const { name, email, password } = CreateUserDto;

    const userInfo = await this.userModel.findOne({ email });

    if (userInfo) {
      throw new ConflictException('Email already exists');
    } else {
      const new_user = await this.userModel.create({
        name: name.trim(),
        email: email.trim(),
        password: await bcrypt.hash(password, 10),
      });

      const token = await this.JwtService.sign({
        _id: new_user.id,
        name: new_user.name,
      });

      return { token, message: 'User registerd successfully' };
    }
  }

  async login_user(
    LoginUserDto: LoginUserDto,
  ): Promise<{ token: string; message: string }> {
    const { email, password } = LoginUserDto;

    const userInfo = await this.userModel
      .findOne({ email })
      .select('+password');

    if (userInfo) {
      const check_password = await bcrypt.compare(password, userInfo.password);
      if (check_password) {
        const token = await this.JwtService.sign({
          _id: userInfo.id,
          name: userInfo.name,
        });

        return { token, message: 'User logged in successfully' };
      } else {
        throw new UnauthorizedException('Email or password is incorrect');
      }
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
