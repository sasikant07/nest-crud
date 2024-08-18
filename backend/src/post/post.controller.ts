import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { AuthGuard } from '@nestjs/passport';
import { post } from './schema/post.schema';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/create')
  @UseGuards(AuthGuard())
  @FormDataRequest({ storage: FileSystemStoredFile })
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() req,
  ): Promise<{ post: post; message: string }> {
    return await this.postService.create(createPostDto, req.user);
  }

  @Get('/all')
  @UseGuards(AuthGuard())
  async get_all_post_by_user(
    @Req() req,
  ): Promise<{ posts: post[]; message: string }> {
    return await this.postService.find_all_post_by_user(req.user);
  }

  @Get('/all/home')
  async get_all_post(): Promise<{ posts: post[]}> {
    return await this.postService.get_all_post();
  }

  @Get(':postId')
  async findOnePostByUser(@Param('postId') postId: string): Promise<{ post: post }> {
    return await this.postService.findOnePostByUser(postId);
  }

  @Put('update/:postId')
  @UseGuards(AuthGuard())
  @FormDataRequest({ storage: FileSystemStoredFile })
  async updatePost(
    @Param('postId') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<{ post: post; message: string }> {
    return await this.postService.updatePost(postId, updatePostDto);
  }

  @Delete('delete/:postId')
  @UseGuards(AuthGuard())
  async remove(
    @Param('postId') postId: string,
  ): Promise<{ post: post; message: string }> {
    return await this.postService.delete_post_by_user(postId);
  }
}
