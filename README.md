# BLOG API

Blog API project developed in [NestJS](#nest-blog-api) as well as [Laravel](#laravel-blog-api).

<br>

## NEST BLOG API

### FEATURES

- Migrations and Seeders
- Validation and Custom Validation Classes
- Custom API Response
- Registration and Authentication
- Role Based Admin Panel for Categories and Posts Management
- Docker and Docker Compose

### SETUP

After cloning the project, cd into **nest-blog-api** and install project dependencies:

```bash
npm install
```

Copy **.env.example** to **.env** and add database credentials.

Create project build:

```bash
npm run build
```

Start the server for listening to incoming requests:

```bash
npm run start:prod
```

Or run in development mode:

```bash
npm run start:dev
```

### DOCKER

Copy database credentials from **.env.example** to **.env** and run to below command to start nodejs and postgres containers:

```bash
docker compose up
```

### MIGRATIONS

Run the migrations:

```bash
npm run migrations:run
```

Revert migrations: (TypeORM reverts migrations one by one so you will need to run the command multiple times)

```bash
npm run migrations:revert
```

NOTE: database configuration for migrations is defined in **src/config/migrations.typeorm.ts**

### SEEDERS

TypeORM does not come with data seeding feature so we are using the migrations as seeders by providing a separate configuration defined in **src/config/seeders.typeorm.ts**:

Running seeder migrations:

```bash
npm run seeders:run
```

Undo the seeder migrations:

```bash
npm run seeders:revert
```

### APIS

Checkout Postman collection in **nest-blog-api/postman** directory for all the api usage examples.

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

## LARAVEL BLOG API

### FEATURES

- Migrations and Seeders
- Validation and Custom Validation Rules
- API Resources
- Custom API Response
- Registration and Authentication
- Role Based Admin Panel for Categories and Posts Management
- S3 Uploads
- Service classes for Business Logic

### SETUP

After cloning the project, cd into laravel-blog-api and install project dependencies:

```bash
composer install
```

Copy **.env.example** to **.env**

Generate application key:

```bash
php artisan key:generate
```

After adding database, you may run the seeders to generate fake data. (check database/seeders directory to see which tables are being seeded)

```bash
php artisan db:seed
```

After adding s3 credentials, you should add the s3 url to .env which we use for creating image urls:

```conf
STORAGE_URL=https://your-bucket-id.s3.amazonaws.com/
```

<br><br>
