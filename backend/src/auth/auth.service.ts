import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { user, user_model } from './schema/user.schema';
import mongoose from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(user_model)
    private userModel : mongoose.Model<user>
  ) {}
  create(CreateUserDto: CreateUserDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
