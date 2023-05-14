import {
  BelongsToManyAddAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationsMixin,
  DataTypes,
} from 'sequelize';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/modules/user/user.model';
import { Category } from 'src/modules/category/category.model';
import { PostCategory } from './post-category.model';

@Table({
  tableName: 'posts',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Post extends Model {
  @Column({
    primaryKey: true,
    type: DataTypes.BIGINT,
    autoIncrement: true,
  })
  id: number;

  @Column(DataTypes.STRING)
  slug: string;

  @Column(DataTypes.STRING)
  title: string;

  @Column(DataTypes.TEXT)
  body: string;

  @Column(DataTypes.STRING)
  image: string;

  @ForeignKey(() => User)
  @Column(DataTypes.BIGINT)
  user_id: number;

  @Column(DataTypes.DATE)
  created_at: Date;

  @Column(DataTypes.DATE)
  updated_at: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Category, () => PostCategory, 'post_id', 'category_id')
  categories: Category[];

  public addCategories!: BelongsToManyAddAssociationsMixin<Category, {}>;
  public removeCategories!: BelongsToManyRemoveAssociationsMixin<Category, {}>;
  public getCategories!: BelongsToManyGetAssociationsMixin<Category>;
}
