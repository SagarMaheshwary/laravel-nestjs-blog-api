import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryModule as AppCategoryModule } from 'src/modules/category/category.module';

@Module({
  imports: [AppCategoryModule],
  controllers: [CategoryController],
})
export class CategoryModule {}
