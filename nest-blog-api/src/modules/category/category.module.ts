import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { DatabaseModule } from '../database/database.module';
import { categoryProviders } from './category.providers';

@Module({
  imports: [DatabaseModule],
  providers: [CategoryService, ...categoryProviders],
  exports: [CategoryService],
})
export class CategoryModule {}
