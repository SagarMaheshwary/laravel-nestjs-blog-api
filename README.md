# LEARNING

Projects created for learning.

<br>

## LARAVEL BLOG API

After cloning the project, cd into laravel-blog-api and install project dependencies:

```
composer install
```

Copy **.env.example** to **.env**

Generate application key:

```
php artisan key:generate
```

After adding database, you may run the seeders to generate fake data. (check database/seeders directory to see which tables are being seeded)

```
php artisan db:seed
```

After adding s3 credentials, you should add the s3 url to .env which we use for creating image urls:

```
STORAGE_URL=https://your-bucket-id.s3.amazonaws.com/
```

<br><br>

## NEST BLOG API

After cloning the project, cd into **nest-blog-api-typeorm** and install project dependencies:

```
npm install
```

Copy **.env.example** to **.env** and add database credentials.

Create project build:

```
npm run build
```

Start the server for listening to incoming requests:

```
npm run start:prod
```

To continue watching for changes, we can do:

```
npm run start:dev
```

### MIGRATIONS

You will first need to create the dist directory using **npm run build** command before running any migrations or seeders because typeorm cli executes the **js** files. Database configuration for the migrations is defined in **src/config/migrations.typeorm.ts**.

Now run the below command to execute all the migrations:

```
npm run migrations:run
```

Revert migrations: (TypeORM reverts migrations one by one so you will need to run the command multiple times)

```
npm run migrations:revert
```

### SEEDERS

TypeORM does not come with data seeding feature so we are using the migrations as seeders using a different configuration defined in **src/config/seeders.typeorm.ts**:

Running seeder migrations:

```
npm run seeders:run
```

Undo the seeder migrations:

```
npm run seeders:revert
```

### APIS

| URI                           | METHOD | DESCRIPTION                                       |
| ----------------------------- | ------ | ------------------------------------------------- |
| /home                         | GET    | Home api that returns latest posts and categories |
| /auth/login                   | POST   | User login                                        |
| /auth/register                | POST   | User registration (only user role)                |
| /auth/profile                 | GET    | Authenticated user's profile                      |
| /posts                        | GET    | Paginated posts listing                           |
| /posts/:id                    | GET    | Post details                                      |
| /posts/likes                  | GET    | Post likes listing                                |
| /posts/likes                  | POST   | Add/Remove like on a specific post                |
| /posts/:id/comments           | GET    | Paginated comments listing                        |
| /posts/:id/comments/:id       | GET    | Paginated comment replies listing                 |
| /posts/:id/comments/:id/likes | GET    | Comment likes listing                             |
| /posts/:id/comments/:id/likes | POST   | Add/Remove like on a specific comment             |
| /admin/categories             | GET    | Paginated categories listing                      |
| /admin/categories             | POST   | Create category                                   |
| /admin/categories/:id         | GET    | Category details                                  |
| /admin/categories/:id         | PUT    | Update category                                   |
| /admin/posts                  | GET    | Paginated posts listing                           |
| /admin/posts                  | POST   | Create post                                       |
| /admin/posts/:id              | GET    | Post details                                      |
| /admin/posts/:id              | PUT    | Update post                                       |

<br><br>

## NEST BLOG API (SEQUELIZE)

NOTE: This project is incomplete and will not receive any new changes.

After cloning the project, cd into **nest-blog-api** and install project dependencies:

```
npm install
```

Copy **.env.example** to **.env** and add database credentials.

Create project build:

```
npm run build
```

Start the server for listening to incoming requests:

```
npm run start:prod
```

To continue watching for changes, we can do:

```
npm run start:dev
```

### MIGRATIONS

Sequelize does not have ts support for migrations so all the migration files will be read from **dist** directory instead of **src** directory.

When running migrations, we first need to create our project build with **npm run build** or keep watching for changes with **npm run start:dev**.

To create a migration we can run:

```
npx sequelize-cli migration:generate --name create-users-table --migrations-path=src/database/migrations
```

Above command will create a javascript file in **src/database/migrations** directory so first we need to change the file extension from **.js** to **.ts** and then copy content from src/database/migrations/skeleton.example file.

To run the migrations:

```
npx sequelize-cli db:migrate
```

Revert migrations:

```
npx sequelize-cli db:migrate:undo
```

Database config specifically used for migrations and seeders can be found in **src/config/sequelize.ts** where we can add/update configuration that will be only used for running the migrations. Paths for config, migrations, and seeders are defined in **.sequelizerc** file.

### SEEDERS

You can use the below command to run all the seeders:

npx sequelize-cli db:seed:all
