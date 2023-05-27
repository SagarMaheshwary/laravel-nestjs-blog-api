import { DataSource } from 'typeorm';
import { DATA_SOURCE, POST_REPOSITORY } from 'src/constants/database';
import { Post } from './post.entity';

export const postProviders = [
  {
    provide: POST_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Post),
    inject: [DATA_SOURCE],
  },
];
