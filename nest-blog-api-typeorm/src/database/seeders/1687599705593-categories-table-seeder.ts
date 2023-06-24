import { faker } from '@faker-js/faker';
import { Category } from 'src/modules/category/category.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoriesTableSeeder1687599705593 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Category.createQueryBuilder()
      .insert()
      .into(Category)
      .values([
        {
          title: 'Laravel',
          description: faker.lorem.sentence(10),
          image: faker.image.urlLoremFlickr({ category: 'abstract' }),
        },
        {
          title: 'VueJS',
          description: faker.lorem.sentence(10),
          image: faker.image.urlLoremFlickr({ category: 'abstract' }),
        },
        {
          title: 'NodeJS',
          description: faker.lorem.sentence(10),
          image: faker.image.urlLoremFlickr({ category: 'abstract' }),
        },
        {
          title: 'ReactJS',
          description: faker.lorem.sentence(10),
          image: faker.image.urlLoremFlickr({ category: 'abstract' }),
        },
        {
          title: 'Nginx',
          description: faker.lorem.sentence(10),
          image: faker.image.urlLoremFlickr({ category: 'abstract' }),
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Category.createQueryBuilder()
      .where('title IN (:...titles)', {
        titles: ['Laravel', 'VueJS', 'NodeJS', 'ReactJS', 'Nginx'],
      })
      .delete()
      .execute();
  }
}
