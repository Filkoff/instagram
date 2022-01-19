import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Schema } from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { HitLikeDto } from './dto/hit-like.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService,
  ) {}

  async create(dto: CreatePostDto, picture): Promise<Post> {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const user = await this.userModel.findById(dto.userId);
    const post = await this.postModel.create({
      ...dto,
      picture: picturePath,
      date: new Date(),
    });
    user.posts.push(post._id);
    await user.save();
    return post;
  }

  async getOne(id: ObjectId): Promise<Post> {
    const post = await this.postModel.findById(id).populate('comments');
    return post;
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const post = await this.postModel.findById(dto.postId);
    const comment = await this.commentModel.create({
      ...dto,
      date: new Date(),
    });
    post.comments.push(comment);
    await post.save();
    return comment;
  }

  async hitLike(dto: HitLikeDto) {
    const post = await this.postModel.findById(dto.postId);
    if (!post.likes.includes(dto.currentUserId)) {
      post.likes.push(dto.currentUserId);
      await post.save();
    } else {
      post.likes = post.likes.filter((item) => item !== dto.currentUserId);
      await post.save();
    }
    return post;
  }
}
