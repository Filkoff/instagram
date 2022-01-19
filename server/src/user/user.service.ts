import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUsertDto } from './dto/create-user.dto';
import { Post, PostDocument } from '../post/schemas/post.schema';
import { User, UserDocument } from './schemas/user.schema';
import { FollowUserDto } from './dto/follow-user.dto';
import { FileService, FileType } from 'src/file/file.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private fileService: FileService,
  ) {}

  async createUser(dto: CreateUsertDto): Promise<User> {
    const user = await this.userModel.create({
      ...dto,
    });
    return user;
  }

  async search(query: string): Promise<User[]> {
    if (query === '') {
      return [];
    }
    const users = await this.userModel
      .find({
        name: { $regex: new RegExp(query, 'i') },
      })
      .populate('posts');
    return users;
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async follow(dto: FollowUserDto) {
    const user = await this.userModel.findById(dto.currentUserId);
    const followingUser = await this.userModel.findById(dto.id);
    if (!user.followed.includes(dto.id)) {
      user.followed.push(dto.id);
      await user.save();
      followingUser.followers.push(dto.currentUserId);
      await followingUser.save();
    } else {
      user.followed = user.followed.filter((item) => item !== dto.id);
      await user.save();
      followingUser.followers = followingUser.followers.filter(
        (item) => item !== dto.currentUserId,
      );
      await followingUser.save();
    }
    return user;
  }

  async getFollowedUsers(id: ObjectId) {
    const user = await this.userModel.findById(id);
    let followedUsers = [];
    for (let i = 0; i < user.followed.length; i++) {
      const followed = await this.userModel
        .findById(user.followed[i])
        .populate('posts');
      followedUsers.push(followed);
    }

    return followedUsers;
  }

  async getUserByName(name: string): Promise<User> {
    const user = await this.userModel
      .findOne({
        name: name,
      })
      .populate('posts');
    return user;
  }

  async getUserById(id: ObjectId): Promise<User> {
    const user = await this.userModel.findById(id).populate('posts');
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).populate('posts');
    return user;
  }

  async setAvatar(_id: ObjectId, picture) {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const user = await this.userModel.findById(_id);
    user.avatar = picturePath;
    user.save();
    return user;
  }

  async deleteAvatar(id: ObjectId): Promise<User> {
    const user = await this.userModel.findById(id);
    user.avatar = null;
    user.save();
    return user;
  }

  async getRecommendedUsers(id: ObjectId): Promise<User[]> {
    const user = await this.userModel.findById(id).populate('posts');
    const allUsers = await this.userModel.find();
    const followedUsers = user.followed;
    const recommended = allUsers.filter(
      (item) => !followedUsers.includes(item._id) && item._id !== id,
    );
    return recommended;
  }
}
