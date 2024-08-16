import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { AuthModule } from 'src/auth/auth.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { post_model, post_schema } from './schema/post.schema';

@Module({
  imports: [
    AuthModule,
    NestjsFormDataModule,
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: post_model,
        schema: post_schema,
      },
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
