import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CreateLikesTable1687695288665 implements MigrationInterface {
  private tableName = 'likes';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'likeable_id',
            type: 'bigint',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'likeable_type',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'bigint',
            unsigned: false,
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        columnNames: ['likeable_id', 'likeable_type'],
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);

    await queryRunner.dropForeignKeys(this.tableName, table.foreignKeys);
    await queryRunner.dropTable(this.tableName);
  }
}
