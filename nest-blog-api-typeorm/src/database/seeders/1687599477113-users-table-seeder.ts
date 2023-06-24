import { Role } from 'src/modules/user/enum/role.enum';
import { User } from 'src/modules/user/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class UsersTableSeeder1687599477113 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await bcrypt.hash('Password123', 10);

    await User.createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          name: 'admin',
          email: 'admin@gmail.com',
          password: password,
          role: Role.admin,
        },
        {
          name: 'user',
          email: 'user@gmail.com',
          password: password,
          role: Role.user,
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await User.createQueryBuilder()
      .where('email IN (:...emails)', {
        emails: ['user@gmail.com', 'admin@gmail.com'],
      })
      .delete()
      .execute();
  }
}
