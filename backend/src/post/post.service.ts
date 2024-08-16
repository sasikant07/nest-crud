import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { post, post_model } from './schema/post.schema';
import mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(post_model)
    private postModel: mongoose.Model<post>,
    private readonly configService: ConfigService,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    userInfo,
  ): Promise<{ post: post; message: string }> {
    const { title, description, image } = createPostDto;
    cloudinary.config({
      cloud_name: this.configService.get('CLOUD_NAME'),
      api_key: this.configService.get('API_KEY'),
      api_secret: this.configService.get('API_SECRET'),
    });

    const data = await cloudinary.uploader.upload(image.path);
    const new_post = await this.postModel.create({
      user_id: userInfo._id,
      title,
      description,
      image: data.url,
    });

    return {
      post: new_post,
      message: 'post create successfully',
    };
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
