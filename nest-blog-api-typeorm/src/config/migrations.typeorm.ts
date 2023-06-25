import { DataSource } from 'typeorm';
import { config as configEnv } from 'dotenv';
import config from '.';
import { CreateUsersTable1687456597236 } from 'src/database/migrations/1687456597236-create-users-table';
import { CreatePostsTable1687537500499 } from 'src/database/migrations/1687537500499-create-posts-table';
import { CreateCategoryTable1687538446799 } from 'src/database/migrations/1687538446799-create-category-table';
import { CreatePostCategoryTable1687539188318 } from 'src/database/migrations/1687539188318-create-post-category-table';
import { CreateCommentsTable1687597541599 } from 'src/database/migrations/1687597541599-create-comments-table';
import { AddImageColumnToUsersTable1687598457620 } from 'src/database/migrations/1687598457620-add-image-column-to-users-table';
import { CreateLikesTable1687695288665 } from 'src/database/migrations/1687695288665-create-likes-table';

/**
 * CONFIG FILE USED WHEN RUNNING THE MIGRATIONS
 * ------------------------------------------------------------------------
 *
 * Creating migration:
 * npx typeorm migrations:create src/database/migrations/create-users-table
 *
 * Commands for running the migrations:
 * npx typeorm migration:run -d dist/config/migrations.typeorm.js
 * npx typeorm migration:revert -d dist/config/migrations.typeorm.js
 */

configEnv();

//TypeORM database connection
export default new DataSource({
  type: 'postgres', //@TODO: get from config
  host: config().database.host,
  database: config().database.database,
  username: config().database.username,
  password: config().database.password,
  port: config().database.port,
  schema: config().database.schema,
  logging: Boolean(config().database.logging),
  migrations: [
    CreateUsersTable1687456597236,
    CreatePostsTable1687537500499,
    CreateCategoryTable1687538446799,
    CreatePostCategoryTable1687539188318,
    CreateCommentsTable1687597541599,
    AddImageColumnToUsersTable1687598457620,
    CreateLikesTable1687695288665,
  ],
});
