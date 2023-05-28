import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from 'src/modules/category/category.service';
import { CategoryModule as AppCategoryModule } from 'src/modules/category/category.module';

@Module({
  imports: [AppCategoryModule],
  controllers: [CategoryController],
  providers: [],
})
export class CategoryModule {}
