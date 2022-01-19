import { ObjectId } from 'mongoose';
import { FileType } from 'src/file/file.service';

export class CreatePostDto {
  readonly userName: string;
  readonly text: string;
  readonly userId: ObjectId;
}
