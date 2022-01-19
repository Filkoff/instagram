import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HitLikeDto } from './dto/hit-like.dto';

@UseGuards(JwtAuthGuard)
@Controller('/posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  create(@UploadedFiles() files, @Body() dto: CreatePostDto) {
    const { picture } = files;
    return this.postService.create(dto, picture[0]);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/comment')
  addComment(@Body() dto: CreateCommentDto) {
    return this.postService.addComment(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.postService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/like')
  hitLike(@Body() dto: HitLikeDto) {
    return this.postService.hitLike(dto);
  }
}
