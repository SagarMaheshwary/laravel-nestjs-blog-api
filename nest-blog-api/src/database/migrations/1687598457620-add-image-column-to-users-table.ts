import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddImageColumnToUsersTable1687598457620
  implements MigrationInterface
{
  private tableName = 'users';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: 'image',
        type: 'varchar',
        length: '250',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.tableName, 'image');
  }
}
