import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.providers';

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [UserService, ...userProviders],
  exports: [UserService],
})
export class UserModule {}
