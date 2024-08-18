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

  async find_all_post_by_user(
    userInfo,
  ): Promise<{ posts: post[]; message: string }> {
    const posts = await this.postModel
      .find({
        user_id: new mongoose.Types.ObjectId(userInfo._id),
      })
      .exec();

    return {
      posts: posts,
      message: 'User posts fetched successfully',
    };
  }

  async get_all_post(): Promise<{ posts: post[] }> {
    const posts = await this.postModel.find();

    return {
      posts: posts,
    };
  }

  async findOnePostByUser(postId: string): Promise<{ post: post }> {
    const post = await this.postModel.findById(postId);
    return {
      post: post,
    };
  }

  async updatePost(
    postId: string,
    updatePostDto: UpdatePostDto,
  ): Promise<{ post: post; message: string }> {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUD_NAME'),
      api_key: this.configService.get('API_KEY'),
      api_secret: this.configService.get('API_SECRET'),
    });
    const { title, description, old_image, new_image } = updatePostDto;
    let url = '';

    if (new_image) {
      const splitImage = old_image.split('/');
      const imageFile = splitImage[splitImage.length - 1].split('.')[0];
      await cloudinary.uploader.destroy(imageFile);
      const data = await cloudinary.uploader.upload(new_image.path);
      url = data.url;
    } else {
      url = old_image;
    }

    const update_post = await this.postModel.findByIdAndUpdate(postId, {
      title,
      description,
      image: url,
    });

    return {
      post: update_post,
      message: 'Post updated successfully',
    };
  }

  async delete_post_by_user(
    postId: string,
  ): Promise<{ post: post; message: string }> {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUD_NAME'),
      api_key: this.configService.get('API_KEY'),
      api_secret: this.configService.get('API_SECRET'),
    });

    const postInfo = await this.postModel.findById(postId);
    const splitImage = postInfo.image.split('/');
    const imageFile = splitImage[splitImage.length - 1].split('.')[0];
    await cloudinary.uploader.destroy(imageFile);

    await this.postModel.findByIdAndDelete(postId);

    return {
      post: postInfo,
      message: 'Post deleted successfully',
    };
  }
}
