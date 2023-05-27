import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Post } from '../post/post.entity';

@Entity({
  name: 'categories',
})
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Exclude()
  @Column()
  image: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToMany(() => Post)
  @JoinTable({
    name: 'post_category',
    joinColumn: {
      name: 'category_id',
    },
    inverseJoinColumn: {
      name: 'post_id',
    },
  })
  posts: Post[];
}
