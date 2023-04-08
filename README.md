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

<br>

## NEST BLOG API

After cloning the project, cd into nest-blog-api and install project dependencies:

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
npm run start
```

To watch for changes in your files, we can do:

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

Database config specifically used for migrations can be found in **src/config/sequelize.ts** where we can add/update configuration that will be only used for running the migrations. Paths for config, migrations, and seeders are defined in **.sequelizerc** file. 

