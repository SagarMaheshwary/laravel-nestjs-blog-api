import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostModule as AppPostModule } from 'src/modules/post/post.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [JwtModule, UserModule, AppPostModule],
  controllers: [PostController],
})
export class PostModule {}
