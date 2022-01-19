import { ObjectId } from 'mongoose';

export class FollowUserDto {
  readonly currentUserId: ObjectId;
  readonly id: ObjectId;
}
