import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Post } from '../../post/schemas/post.schema';

export type PostCommentDocument = PostComment & Document;

@Schema()
export class PostComment {
  @Prop()
  userName: string;

  @Prop()
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: Post;
}

export const PostCommentSchema = SchemaFactory.createForClass(PostComment);
