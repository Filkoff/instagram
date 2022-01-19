import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';
import * as path from 'path';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.qkzts.mongodb.net/insta?retryWrites=true&w=majority',
    ),
    AuthModule,
    FileModule,
    UserModule,
    PostModule,
  ],
})
export class AppModule {}
