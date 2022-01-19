import { ObjectId } from 'mongoose';

export class CreateCommentDto {
  readonly userName: string;
  readonly userId: ObjectId;
  readonly text: string;
  readonly postId: ObjectId;
}
