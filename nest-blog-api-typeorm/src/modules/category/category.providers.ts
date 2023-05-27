import { DataSource } from 'typeorm';
import { CATEGORY_REPOSITORY, DATA_SOURCE } from 'src/constants/database';
import { Category } from './category.entity';

export const categoryProviders = [
  {
    provide: CATEGORY_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: [DATA_SOURCE],
  },
];
