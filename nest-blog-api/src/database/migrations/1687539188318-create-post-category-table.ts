import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePostCategoryTable1687539188318
  implements MigrationInterface
{
  private tableName = 'post_category';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'post_id',
            type: 'bigint',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'category_id',
            type: 'bigint',
            unsigned: true,
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createPrimaryKey(this.tableName, [
      'post_id',
      'category_id',
    ]);

    await queryRunner.createForeignKeys(this.tableName, [
      new TableForeignKey({
        columnNames: ['post_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'posts',
      }),
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);

    await queryRunner.dropForeignKeys(this.tableName, table.foreignKeys);
    await queryRunner.dropTable(this.tableName);
  }
}
