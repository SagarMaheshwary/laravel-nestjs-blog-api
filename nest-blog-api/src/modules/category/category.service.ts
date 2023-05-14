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

  async paginated(page: number, perPage: number): Promise<IPaginator> {
    const paginator = new Paginator(
      this.sequelize,
      Category,
      {
        order: [['id', 'DESC']],
      },
      page,
      perPage,
    );

    return await paginator.paginate();
  }

  async findOne(id: number): Promise<Category> {
    return await this.categoryRepository.findByPk(id);
  }

  async save(dto: CreateCategoryDTO): Promise<Category> {
    //@TODO: upload image to S3
    dto.image = faker.image.abstract();

    return await this.categoryRepository.create({
      title: dto.title,
      description: dto.description,
      image: dto.image,
    });
  }

  async update(category: Category, dto: UpdateCategoryDTO): Promise<Category> {
    category.title = dto.title;
    category.description = dto.description;

    if (dto.image) {
      //@TODO: upload image to S3 and delete existing.
    }

    return await category.save();
  }
}
