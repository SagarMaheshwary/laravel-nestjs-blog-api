import { Inject, Injectable } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from 'src/constants/database';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { UpdateCategoryDTO } from './dto/update-category.dto';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async paginated(page: number, perPage: number) {
    //
  }

  async popularByPosts() {
    //@TODO: write the actual query for popular categories.
    return await this.categoryRepository.find({
      take: 5,
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Category> {
    return await this.categoryRepository.findOneBy({ id });
  }

  async save(dto: CreateCategoryDTO): Promise<Category> {
    //@TODO: upload image to S3
    dto.image = faker.image.urlLoremFlickr({ category: 'abstract' });

    return await this.categoryRepository.save({
      title: dto.title,
      description: dto.description,
      image: dto.image,
    });
  }

  async update(category: Category, dto: UpdateCategoryDTO) {
    //
  }
}
