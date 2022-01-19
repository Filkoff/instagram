import { ObjectId } from 'mongoose';

export class HitLikeDto {
  readonly currentUserId: ObjectId;
  readonly postId: ObjectId;
}
