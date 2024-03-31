import { DataSource } from 'typeorm';
import { config as configEnv } from 'dotenv';
import config from '.';
import { UsersTableSeeder1687599477113 } from 'src/database/seeders/1687599477113-users-table-seeder';
import { CategoriesTableSeeder1687599705593 } from 'src/database/seeders/1687599705593-categories-table-seeder';
import { PostsTableSeeder1687599711477 } from 'src/database/seeders/1687599711477-posts-table-seeder';
import { User } from 'src/modules/user/user.entity';
import { Post } from 'src/modules/post/post.entity';
import { Category } from 'src/modules/category/category.entity';
import { CommentsTableSeeder1687629187803 } from 'src/database/seeders/1687629187803-comments-table-seeder';
import { Comment } from 'src/modules/comment/comment.entity';
import { Like } from 'src/modules/like/like.entity';

/**
 * CONFIG FILE USED WHEN RUNNING THE SEEDS (TYPEORM MIGRATIONS)
 * -------------------------------------------------------------------------------------
 *
 * Creating seeder:
 * npx typeorm migrations:create src/database/seeders/users-table-seeder
 *
 * Commands for running the migrations:
 * npm run seeders:run
 * npm run seeders:revert
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
  migrationsTableName: config().database.seedersTable,
  logging: Boolean(config().database.logging),
  entities: [User, Post, Category, Comment, Like],
  migrations: [
    UsersTableSeeder1687599477113,
    CategoriesTableSeeder1687599705593,
    PostsTableSeeder1687599711477,
    CommentsTableSeeder1687629187803,
  ],
});
