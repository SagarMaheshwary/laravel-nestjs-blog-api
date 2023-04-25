import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/modules/user/user.module';
import { CategoryModule as AppCategoryModule } from 'src/modules/category/category.module';

@Module({
  imports: [JwtModule, UserModule, AppCategoryModule],
  controllers: [CategoryController],
})
export class CategoryModule {}
