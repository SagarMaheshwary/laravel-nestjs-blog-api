# learning
Projects created for learning.

## Laravel Blog API
After cloning the project, cd into laravel-blog-api and install project dependencies:

```composer install```

Copy **.env.example** to **.env**

Generate application key:

```php artisan key:generate```

After adding database, you may run the seeders to generate fake data. (check database/seeders directory to see which tables are being seeded)

```php artisan db:seed```

After adding s3 credentials, you should add the s3 url to .env which we use for creating image urls:

```STORAGE_URL=https://your-bucket-id.s3.amazonaws.com/```
