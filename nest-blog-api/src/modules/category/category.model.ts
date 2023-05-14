import { DataTypes } from 'sequelize';
import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Post } from '../post/models/post.model';
import { PostCategory } from '../post/models/post-category.model';

@Table({
  tableName: 'categories',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Category extends Model {
  @Column({
    primaryKey: true,
    type: DataTypes.BIGINT,
    autoIncrement: true,
  })
  id: number;

  @Column(DataTypes.STRING)
  title: string;

  @Column(DataTypes.TEXT)
  description: string;

  @Column(DataTypes.STRING)
  image: string;

  @Column(DataTypes.DATE)
  created_at: Date;

  @Column(DataTypes.DATE)
  updated_at: Date;

  @BelongsToMany(() => Post, () => PostCategory)
  posts: Post[];
}
