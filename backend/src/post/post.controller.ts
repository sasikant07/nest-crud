import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
  ): Promise<{ post: post, message: string }> {
    return await this.postService.create(createPostDto, req.user);
  }

  @Get('/all')
  @UseGuards(AuthGuard())
  async get_all_post_by_user(@Req() req): Promise<{ posts: post[]; message: string }> {
    return await this.postService.find_all_post_by_user(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
