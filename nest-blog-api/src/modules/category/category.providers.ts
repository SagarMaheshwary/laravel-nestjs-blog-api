import { CATEGORY_REPOSITORY } from 'src/constants/sequelize';
import { Category } from './category.model';

export const categoryProviders = [
  {
    provide: CATEGORY_REPOSITORY,
    useValue: Category,
  },
];
