import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Post } from './post.model';
import { Category } from 'src/modules/category/category.model';

@Table({
  tableName: 'post_category',
  timestamps: false,
})
export class PostCategory extends Model {
  @ForeignKey(() => Post)
  @Column
  post_id: number;

  @ForeignKey(() => Category)
  @Column
  category_id: number;
}
