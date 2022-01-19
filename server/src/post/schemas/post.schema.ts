import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Comment } from './comment.schema';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  userName: string;

  @Prop()
  text: string;

  @Prop()
  picture: string;

  @Prop()
  likes: mongoose.ObjectId[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  // {
  // type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  // }
  comments: Comment[];

  @Prop()
  date: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
