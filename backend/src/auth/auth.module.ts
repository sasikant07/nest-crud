import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { user_model, user_schema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: user_model, schema: user_schema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
