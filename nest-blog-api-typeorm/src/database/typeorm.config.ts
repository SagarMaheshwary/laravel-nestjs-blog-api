import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config as configEnv } from 'dotenv';
import config from 'src/config';
import { CreateUsersTable1687456597236 } from './migrations/1687456597236-create-users-table';
import { CreatePostsTable1687537500499 } from './migrations/1687537500499-create-posts-table';
import { CreateCategoryTable1687538446799 } from './migrations/1687538446799-create-category-table';
import { CreatePostCategoryTable1687539188318 } from './migrations/1687539188318-create-post-category-table';

/**
 * CONFIG FILE USED WHEN RUNNING THE MIGRATIONS
 * ------------------------------------------------------------------------
 *
 * Creating migration:
 * npx typeorm migrations:create src/database/migrations/create-users-table
 *
 * Commands for running the migrations:
 * npx typeorm migration:run -d dist/database/typeorm.config.js
 * npx typeorm migration:revert -d dist/database/typeorm.config.js
 */

configEnv({
  path: `${__dirname}/../../.env`,
});

const configService = new ConfigService(config());

//TypeORM database connection
export default new DataSource({
  type: 'postgres', //@TODO: get from config
  host: configService.get('database.host'),
  database: configService.get('database.database'),
  username: configService.get('database.username'),
  password: configService.get('database.password'),
  port: configService.get('database.port'),
  schema: configService.get('database.schema'),
  migrations: [
    CreateUsersTable1687456597236,
    CreatePostsTable1687537500499,
    CreateCategoryTable1687538446799,
    CreatePostCategoryTable1687539188318,
  ],
  logging: Boolean(configService.get('database.logging')),
});
