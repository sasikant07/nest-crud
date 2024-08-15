import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { AuthModule } from 'src/auth/auth.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    NestjsFormDataModule,
    ConfigModule
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
