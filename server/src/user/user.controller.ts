import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { CreateUsertDto } from './dto/create-user.dto';
import { FollowUserDto } from './dto/follow-user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  createUser(@Body() dto: CreateUsertDto) {
    return this.userService.createUser(dto);
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.userService.search(query);
  }

  @Get('/all')
  getUsers() {
    return this.userService.getUsers();
  }

  @Post('/follow')
  follow(@Body() dto: FollowUserDto) {
    return this.userService.follow(dto);
  }

  @Get('/followedUsers/:id')
  getFollowedUsers(@Param('id') id: ObjectId) {
    return this.userService.getFollowedUsers(id);
  }

  @Get('/check/:name')
  getUserByName(@Param('name') name: string) {
    return this.userService.getUserByName(name);
  }

  @Get(':id')
  getUserById(@Param('id') id: ObjectId) {
    return this.userService.getUserById(id);
  }

  @Post('/avatar')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  setAvatar(@UploadedFiles() files, @Body() _id) {
    const { picture } = files;
    return this.userService.setAvatar(_id, picture[0]);
  }

  @Delete('/avatar/:id')
  deleteAvatar(@Param('id') id: ObjectId) {
    return this.userService.deleteAvatar(id);
  }

  @Get('/recommended/:id')
  getRecommendedUsers(@Param('id') id: ObjectId) {
    return this.userService.getRecommendedUsers(id);
  }
}
