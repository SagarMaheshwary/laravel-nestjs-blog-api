import { Inject, Injectable } from '@nestjs/common';
import { Category } from './category.model';
import { Paginator } from 'src/lib/paginator';
import { Paginator as IPaginator } from 'src/lib/interfaces/paginator';
import { Sequelize } from 'sequelize-typescript';
import { CATEGORY_REPOSITORY, SEQUELIZE } from 'src/constants/sequelize';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { faker } from '@faker-js/faker';
import { UpdateCategoryDTO } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof Category,
    @Inject(SEQUELIZE) private readonly sequelize: Sequelize,
  ) {}

  async paginated(page: number, limit: number): Promise<IPaginator> {
    const paginator = new Paginator(
      this.sequelize,
      Category,
      {
        order: [['id', 'DESC']],
      },
      page,
      limit,
    );
    return await paginator.paginate();
  }

  async findOne(id: number): Promise<Category> {
    return await this.categoryRepository.findByPk(id);
  }

  async save(categoryDTO: CreateCategoryDTO): Promise<Category> {
    //@TODO: upload image to S3
    categoryDTO.image = faker.image.abstract();

    return await this.categoryRepository.create({
      title: categoryDTO.title,
      description: categoryDTO.description,
      image: categoryDTO.image,
    });
  }

  async update(
    category: Category,
    categoryDTO: UpdateCategoryDTO,
  ): Promise<Category> {
    category.title = categoryDTO.title;
    category.description = categoryDTO.description;

    if (categoryDTO.image) {
      //@TODO: upload image to S3 and delete existing.
    }

    return await category.save();
  }
}
