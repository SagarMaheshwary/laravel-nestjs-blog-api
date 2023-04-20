import { Exclude } from 'class-transformer';
import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class User extends Model {
  @Column({ primaryKey: true, type: DataTypes.BIGINT, autoIncrement: true })
  id: number;

  @Column(DataTypes.STRING)
  name: string;

  @Column(DataTypes.STRING)
  email: string;

  @Column(DataTypes.STRING)
  password: string;

  @Column(DataTypes.STRING)
  role: string;

  @Column(DataTypes.DATE)
  created_at: Date;

  @Column(DataTypes.DATE)
  updated_at: Date;
}
