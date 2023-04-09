import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class User extends Model {
  @Column({ primaryKey: true })
  id: number;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  role: string;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;
}
