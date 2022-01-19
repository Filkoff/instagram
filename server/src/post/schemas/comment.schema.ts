import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Post } from './post.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  userName: string;

  @Prop()
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: Post;

  @Prop()
  date: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
