import { POST_REPOSITORY } from 'src/constants/sequelize';
import { Post } from './models/post.model';

export const postProviders = [
  {
    provide: POST_REPOSITORY,
    useValue: Post,
  },
];
