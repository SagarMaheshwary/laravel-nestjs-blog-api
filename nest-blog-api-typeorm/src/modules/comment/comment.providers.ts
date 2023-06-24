import { DataSource } from 'typeorm';
import { Comment } from './comment.entity';
import { COMMENT_REPOSITORY, DATA_SOURCE } from 'src/constants/database';

export const commentProviders = [
  {
    provide: COMMENT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Comment),
    inject: [DATA_SOURCE],
  },
];
