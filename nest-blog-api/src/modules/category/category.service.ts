import { Inject, Injectable } from '@nestjs/common';
import { Category } from './category.model';
import { Paginator } from 'src/lib/paginator';
import { Sequelize } from 'sequelize-typescript';
import { CATEGORY_REPOSITORY, SEQUELIZE } from 'src/constants/sequelize';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof Category,
    @Inject(SEQUELIZE) private readonly sequelize: Sequelize,
  ) {}

  async paginated(page: number, limit: number) {
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
}
